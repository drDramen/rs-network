/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { TypeUser } from '../../types/types';
import NoUsersFound from '../../components/no-users-found/no-users-found';
import { apiService } from '../../services/api-service';
import SearchForm from '../../components/search-form';
import UserItem from '../../components/user-item';
import classes from './AllUsersPage.module.css';

const AllUsersPage = () => {
  const [users, setUsers] = useState<TypeUser[]>([]);
  const [filtredUsers, setFiltredUsers] = useState<TypeUser[]>([]);
  const [isDefault, setIsDefault] = useState<boolean>(true);

  useEffect(() => {
    setIsDefault(
      users.length == filtredUsers.length && users.every((v, i) => filtredUsers[i] == v)
        ? true
        : false,
    );
  }, [filtredUsers]);

  useEffect(() => {
    apiService.getAllUsers().then((allUsers) => {
      setUsers(allUsers);
      setFiltredUsers(allUsers);
    });
  }, []);

  const renderUsers = (arr: TypeUser[]) => {
    return arr.map(
      ({
        _id,
        name,
        image,
        age,
        location,
      }: {
        _id: string;
        name: string;
        image: string;
        age: number;
        location: string;
      }) => {
        return (
          <UserItem
            key={_id}
            _id={_id}
            name={name}
            image={image}
            sizeAvatar={70}
            age={age}
            location={location}
          />
        );
      },
    );
  };

  return (
    <div className={classes.wrapper}>
      <ToastContainer
        position='top-center'
        theme='colored'
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
      />
      <SearchForm
        users={users}
        filtredUsers={filtredUsers}
        setFiltredUsers={setFiltredUsers}
        isDefault={isDefault}
      />
      {filtredUsers.length ? renderUsers(filtredUsers) : <NoUsersFound />}
    </div>
  );
};

export default AllUsersPage;
