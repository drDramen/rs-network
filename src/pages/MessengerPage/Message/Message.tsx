import Avatar from '../../../components/avatar';
import classes from './Message.module.css';

const Message = ({
  image,
  name,
  text,
  date,
  own,
}: {
  image: string;
  name: string;
  text: string;
  date: string;
  own?: boolean;
}) => {
  return (
    <div className={own ? `${classes.message} ${classes.own}` : classes.message}>
      <div className={own ? `${classes.message_top} ${classes.own}` : classes.message_top}>
        <Avatar
          image={image}
          name={name}
        />
        <p className={own ? `${classes.text} ${classes.own}` : classes.text}>{text}</p>
      </div>
      <div className={own ? `${classes.message_bottom} ${classes.own}` : classes.message_bottom}>
        {date}
      </div>
    </div>
  );
};

export default Message;
