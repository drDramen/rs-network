/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { TypeUser } from '../../types/types';
import { useUser } from '../../hooks/useUser';
import NoUsersFound from '../../components/no-users-found';
import { apiService } from '../../services/api-service';
import UserItem from '../../components/user-item';
import classes from './FollowersPage.module.css';
import LoadSpinner from '../../components/load-spinner/LoadSpinner';

const FollowersPage = () => {
  const [followers, setFollowers] = useState<TypeUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    setIsLoading(true);
    Promise.all(user.followers.map((id) => apiService.getUser(id)))
      .then((followers) => {
        setFollowers(followers);
      })
      .catch((err) => {
        const error = err as Error;
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const renderFollowers = (arr: TypeUser[]) => {
    return arr.map(({ _id, name, image }: { _id: string; name: string; image: string }) => {
      return name === 'User deleted' ? null : (
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
      {!isLoading &&
        (followers.length ? renderFollowers(followers) : <NoUsersFound title={title} />)}
      {isLoading && <LoadSpinner />}
    </div>
  );
};

export default FollowersPage;
