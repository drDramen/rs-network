import { useEffect, useState } from 'react';
import Avatar from '../../../components/avatar';
import FollowButton from '../../../components/buttons/FollowButton';
import TextParagraph from '../../../components/paragraph/TextParagraph';
import { useUser } from '../../../hooks/useUser';
import ApiService from '../../../services/api-service';
import classes from './UserInfo.module.css';

const UserInfo = () => {
  const currentId = location.pathname.split('/')[2];
  const apiService = new ApiService();
  const authContext = useUser();
  const [user, setUser] = useState(authContext.user);
  useEffect(() => {
    if (currentId !== user._id) {
      void apiService.getUser(currentId).then((newUser) => setUser(newUser));
    }
  });

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
        {authContext.user._id === user._id ? null : <FollowButton followedUserId={user._id} />}
      </div>
    </div>
  );
};

export default UserInfo;
