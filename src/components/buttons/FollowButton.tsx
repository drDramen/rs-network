import { Button } from 'antd';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';
import { TypeUser } from '../../types/types';
import { toast } from 'react-toastify';
import './FollowButton.css';

const FollowButton = ({
  followedUserId,
  followedUserName,
}: {
  followedUserId: string;
  followedUserName: string;
}) => {
  const authContext = useUser();
  const user = authContext.user as TypeUser;
  const [isFollow, setIsFollow] = useState(user.followers.includes(followedUserId));
  const handleClick = () => {
    if (isFollow) {
      const followerIndex = user.followers.indexOf(followedUserId);
      user.followers.splice(followerIndex, 1);
    } else {
      user.followers.push(followedUserId);
    }
    void authContext.updateUser(user);
    setIsFollow(!isFollow);
    try {
      void authContext.updateUser(user);
      if (isFollow) {
        toast.info(`You have unfollowed to ${followedUserName}!`);
      } else {
        toast.info(`You have followed to ${followedUserName}!`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Oh no something went wrong: ${error.message}`);
      }
    }
  };

  return (
    <div style={{ maxWidth: '120px', width: '100%' }}>
      {isFollow ? (
        <Button
          block
          danger
          onClick={handleClick}
          style={{ backgroundColor: 'var(--secondary-button-color)', maxWidth: '110px' }}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          block
          type='primary'
          onClick={handleClick}
          className='btn-follow'
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowButton;
