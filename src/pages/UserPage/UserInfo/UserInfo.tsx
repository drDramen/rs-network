import Avatar from '../../../components/avatar';
import TextParagraph from '../../../components/paragraph/TextParagraph';
import { useUser } from '../../../hooks/useUser';
import classes from './UserInfo.module.css';

const UserInfo = () => {
  const { user } = useUser();

  return (
    <div className={classes.wrapper}>
      <Avatar
        image={user.image}
        name={user.name}
        size={{ xs: 180, sm: 180, md: 210, lg: 210, xl: 230, xxl: 280 }}
      ></Avatar>
      <div>
        <TextParagraph
          weight='bold'
          size='large'
        >
          {user.name.split(' ')[0]}
        </TextParagraph>
        <TextParagraph
          weight='bold'
          size='large'
        >
          {user.name.split(' ')[1]}
        </TextParagraph>
        <TextParagraph>{user.age ? `${user.age} y.o` : ''}</TextParagraph>
        <TextParagraph>{user.location}</TextParagraph>
        <TextParagraph>{user.email}</TextParagraph>
      </div>
    </div>
  );
};

export default UserInfo;
