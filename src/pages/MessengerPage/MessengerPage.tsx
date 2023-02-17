import { SearchOutlined, WechatOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import classes from './MessengerPage.module.css';
import { useUser } from '../../hooks/useUser';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';
import { useState, useEffect, useRef } from 'react';
import ApiService from '../../services/api-service';
import { TypeDialog, TypeMessage } from '../../types/types';

const MessengerPage = () => {
  const { user } = useUser();
  const [isDialogsHide, setIsDialogsHide] = useState(true);
  const [dialogs, setDialogs] = useState<TypeDialog[]>([]);
  const [dialogsReserve, setDialogsReserve] = useState<TypeDialog[]>([]);
  const [dialogSearch, setDialogSearch] = useState('');
  const [activeDialog, setActiveDialog] = useState<TypeDialog>({
    _id: '',
    members: [],
  });
  const [messages, setMessages] = useState<TypeMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const scroll = useRef<HTMLDivElement>(null);
  const breakPoint = 1100;

  const handleNewMessage = async () => {
    if (newMessageText) {
      const newMessage = await new ApiService().createMessage(
        activeDialog._id,
        user._id,
        newMessageText,
      );
      setMessages([...messages, newMessage]);
      setNewMessageText('');
    }
  };

  const toggleDialogs = () => {
    setIsDialogsHide(!isDialogsHide);
  };

  const activateDialog = (dialog: TypeDialog) => {
    setActiveDialog(dialog);
    if (window.innerWidth <= breakPoint) {
      setIsDialogsHide(!isDialogsHide);
    }
  };

  // for render dialogs
  useEffect(() => {
    const getDialogs = async (): Promise<void> => {
      const receivedDialogs = await new ApiService().getUserDialogs(user._id);
      setDialogs(receivedDialogs);
      setDialogsReserve(receivedDialogs);
    };

    void getDialogs();
  }, [user._id]);

  // for open dialog
  useEffect(() => {
    if (activeDialog._id) {
      const getMessages = async (): Promise<void> => {
        const receivedMessages = await new ApiService().getMessages(activeDialog._id);
        setMessages(receivedMessages);
      };

      void getMessages();
    }
  }, [activeDialog]);

  // for scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // for search in dialogs
  useEffect(() => {
    if (dialogSearch) {
      const asyncFilter = async () => {
        const mappedPromises = dialogsReserve.map((dialog) => {
          const friendId = dialog.members.find((member) => member !== user._id);
          const userPromises = new ApiService().getUser(friendId as string);
          return userPromises;
        });
        const users = await Promise.all(mappedPromises);
        const booleans = users.map((value) =>
          value.name.toUpperCase().includes(dialogSearch.toUpperCase()),
        );
        const foundDialogs = dialogsReserve.filter((dialog, index) => booleans[index]);
        setDialogs(foundDialogs);
      };

      void asyncFilter();
    } else {
      setDialogs(dialogsReserve);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogSearch]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.messages_block}>
        <div className={classes.messages_top}>
          {activeDialog._id ? (
            messages.map((message) => {
              return (
                <div
                  className={classes.message_wrapper}
                  key={message._id}
                  ref={scroll}
                >
                  <Message content={message} />
                </div>
              );
            })
          ) : (
            <div className={classes.message_desc}>
              <WechatOutlined />
              <div>Open a dialog to start a chat</div>
            </div>
          )}
        </div>
        <div className={classes.messages_bottom}>
          <MessageForm
            value={newMessageText}
            handleSubmit={() => {
              void handleNewMessage();
            }}
            handleNewMessage={setNewMessageText}
          />
        </div>
      </div>
      <div
        className={
          isDialogsHide ? `${classes.dialogs_block} ${classes.hidden}` : classes.dialogs_block
        }
      >
        <>
          <Input
            placeholder='Find your friends'
            suffix={<SearchOutlined />}
            value={dialogSearch}
            onChange={(event) => {
              setDialogSearch(event.target.value);
            }}
          />
          {dialogs.length ? (
            dialogs.map((dialog) => {
              return (
                <div
                  key={dialog._id}
                  onClick={() => activateDialog(dialog)}
                >
                  <Dialog dialog={dialog} />
                </div>
              );
            })
          ) : (
            <div className={classes.dialog_desc}>
              Oh, no! You haven't any correspondence. Go and try your first!
            </div>
          )}
        </>
      </div>
      <div
        className={classes.show_button}
        onClick={toggleDialogs}
      >
        Dialogs
      </div>
    </div>
  );
};

export default MessengerPage;
