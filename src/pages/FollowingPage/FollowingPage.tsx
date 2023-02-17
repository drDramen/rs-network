/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { TypeUser } from '../../types/types';
import { useUser } from '../../hooks/useUser';
import NoUsersFound from '../../components/no-users-found';
import { apiService } from '../../services/api-service';
import UserItem from '../../components/user-item';
import classes from './FollowingPage.module.css';

const FollowingPage = () => {
  const [followings, setFollowings] = useState<TypeUser[]>([]);
  const { user } = useUser();

  useEffect(() => {
    apiService.getFollowing(user._id).then((allFollowings) => {
      setFollowings(allFollowings);
    });
  }, []);

  const renderFollowing = (arr: TypeUser[]) => {
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

  const title = "You don't have any followers";

  return (
    <div className={classes.wrapper}>
      <ToastContainer
        position='top-center'
        theme='colored'
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
      />
      {followings.length ? renderFollowing(followings) : <NoUsersFound title={title} />}
    </div>
  );
};

export default FollowingPage;
