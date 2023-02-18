/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { TypeUser } from '../../types/types';
import { useUser } from '../../hooks/useUser';
import NoUsersFound from '../../components/no-users-found';
import { apiService } from '../../services/api-service';
import UserItem from '../../components/user-item';
import classes from './FollowersPage.module.css';

const FollowersPage = () => {
  const [followers, setFollowers] = useState<TypeUser[]>([]);
  const { user } = useUser();

  useEffect(() => {
    user.followers.forEach((id) =>
      apiService.getUser(id).then((_folower) => {
        setFollowers((followers) => [...followers, _folower]);
      }),
    );
  }, []);

  const renderFollowers = (arr: TypeUser[]) => {
    return arr.map(({ _id, name, image }: { _id: string; name: string; image: string }) => {
      return (
        <UserItem
          key={_id}
          _id={_id}
          name={name}
          image={image}
          sizeAvatar={50}
        />
      );
    });
  };

  const title = 'You are not following anyone';

  return (
    <div className={classes.wrapper}>
      <ToastContainer
        position='top-center'
        theme='colored'
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
      />
      {followers.length ? renderFollowers(followers) : <NoUsersFound title={title} />}
    </div>
  );
};

export default FollowersPage;
