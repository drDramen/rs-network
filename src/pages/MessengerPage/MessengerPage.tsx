import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import classes from './MessengerPage.module.css';
import Avatar from '../../components/avatar';
import { useUser } from '../../hooks/useUser';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import TextArea from 'antd/es/input/TextArea';
import MessageForm from './MessageForm/MessageForm';
import { useState } from 'react';

const MessengerPage = () => {
  const { user } = useUser();
  const [isDialogsHide, setIsDialogsHide] = useState(true);

  const handleNewMessage = () => {
    console.log('new');
  };

  const toggleDialogs = () => {
    setIsDialogsHide(!isDialogsHide);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.messages_block}>
        <div className={classes.messages_top}>
          <Message
            image={user.image}
            name={user.name}
            text='Hello, this is a message Hello, this is a message Hello, this is a message'
            date='2 hour ago'
          />
          <Message
            image={user.image}
            name={user.name}
            text='Hello, this is a message Hello, this is a message Hello, this is a message'
            date='2 hour ago'
            own={true}
          />
          <Message
            image={user.image}
            name={user.name}
            text='Hello, this is a message Hello, this is a message Hello, this is a message'
            date='2 hour ago'
            own={true}
          />
          <Message
            image={user.image}
            name={user.name}
            text='Hello, this is a message Hello, this is a message Hello, this is a message'
            date='2 hour ago'
            own={true}
          />
          <Message
            image={user.image}
            name={user.name}
            text='Hello, this is a message Hello, this is a message Hello, this is a message'
            date='2 hour ago'
            own={true}
          />
          <Message
            image={user.image}
            name={user.name}
            text='Hello, this is a message Hello, this is a message Hello, this is a message'
            date='2 hour ago'
            own={true}
          />
          <Message
            image={user.image}
            name={user.name}
            text='Hello, this is a message Hello, this is a message Hello, this is a message'
            date='2 hour ago'
          />
          <Message
            image={user.image}
            name={user.name}
            text='Hello, this is a message Hello, this is a message Hello, this is a message'
            date='2 hour ago'
          />
        </div>
        <div className={classes.messages_bottom}>
          <MessageForm handleSubmit={handleNewMessage} />
        </div>
      </div>
      <div
        className={
          isDialogsHide ? `${classes.dialogs_block} ${classes.hidden}` : classes.dialogs_block
        }
      >
        <Input
          placeholder='Find your friends'
          suffix={<SearchOutlined />}
        />
        <Dialog
          image={user.image}
          name={user.name}
        />
        <Dialog
          image={user.image}
          name={user.name}
        />
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
