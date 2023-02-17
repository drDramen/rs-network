import Avatar from '../../../components/avatar';
import { useUser } from '../../../hooks/useUser';
import { TypeMessage, TypeUser } from '../../../types/types';
import classes from './Message.module.css';
import { useEffect, useState } from 'react';
import ApiService from '../../../services/api-service';
import { format } from 'timeago.js';

const Message = ({ content }: { content: TypeMessage }) => {
  const { user } = useUser();
  const own = user._id === content.sender;
  const [currentUser, setCurrentUser] = useState<TypeUser>({
    _id: '',
    name: '',
    email: '',
    image: '',
    age: 0,
    location: '',
    followers: [],
    password: '',
    about: '',
  });

  useEffect(() => {
    if (own) {
      setCurrentUser(user as TypeUser);
    }
    const getFriend = async () => {
      setCurrentUser(await new ApiService().getUser(content.sender));
    };
    void getFriend();
  }, [own, content.sender, user]);

  return (
    <div className={own ? `${classes.message} ${classes.own}` : classes.message}>
      <div className={own ? `${classes.message_top} ${classes.own}` : classes.message_top}>
        <Avatar
          image={currentUser.image}
          name={currentUser.name}
        />
        <p className={own ? `${classes.text} ${classes.own}` : classes.text}>{content.text}</p>
      </div>
      <div className={own ? `${classes.message_bottom} ${classes.own}` : classes.message_bottom}>
        {format(content.createdAt)}
      </div>
    </div>
  );
};

export default Message;
