import { useEffect, useState } from 'react';
import Avatar from '../../../components/avatar';
import FollowButton from '../../../components/buttons/FollowButton';
import TextParagraph from '../../../components/paragraph/TextParagraph';
import { useUser } from '../../../hooks/useUser';
import { apiService } from '../../../services/api-service';
import { EmptyUser, TypeUser } from '../../../types/types';
import classes from './UserInfo.module.css';

const UserInfo = ({
  setCurrentUser,
}: {
  setCurrentUser: React.Dispatch<React.SetStateAction<TypeUser | EmptyUser>>;
}) => {
  const currentId = location.pathname.split('/')[2];

  const authContext = useUser();
  const [user, setUser] = useState(authContext.user);
  const breakPoint = 500;

  useEffect(() => {
    if (currentId !== user._id) {
      void apiService.getUser(currentId).then((newUser) => {
        setUser(newUser);
        setCurrentUser(newUser);
      });
    }
  });

  return (
    <div className={classes.wrapper}>
      <Avatar
        image={user.image}
        name={user.name}
        size={{ xs: 180, sm: 180, md: 210, lg: 210, xl: 230, xxl: 280 }}
      ></Avatar>
      <div className={classes.info}>
        <TextParagraph
          weight='bold'
          size={window.innerWidth > breakPoint ? 'large' : undefined}
        >
          {user.name.split(' ')[0]}
        </TextParagraph>
        <TextParagraph
          weight='bold'
          size={window.innerWidth > breakPoint ? 'large' : undefined}
        >
          {user.name.split(' ')[1]}
        </TextParagraph>
        <TextParagraph size={window.innerWidth > breakPoint ? undefined : 'small'}>
          {user.age ? `${user.age} y.o` : ''}
        </TextParagraph>
        <TextParagraph size={window.innerWidth > breakPoint ? undefined : 'small'}>
          {user.location}
        </TextParagraph>
        <TextParagraph size={window.innerWidth > breakPoint ? undefined : 'small'}>
          {user.email}
        </TextParagraph>
        {authContext.user._id === user._id ? null : user.name === 'User deleted' ? null : (
          <FollowButton
            followedUserId={user._id}
            followedUserName={user.name}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
