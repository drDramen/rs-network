import { Button } from 'antd';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';
import { TypeUser } from '../../types/types';

const FollowButton = ({ followedUserId }: { followedUserId: string }) => {
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
  };

  return (
    <Button
      type='primary'
      onClick={handleClick}
    >
      {isFollow ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
