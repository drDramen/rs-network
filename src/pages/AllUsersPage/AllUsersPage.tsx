/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import classes from './AllUsersPage.module.css';
import { useEffect, useState } from 'react';
import ApiService from '../../services/api-service';
import { TypeUser } from '../../types/types';
import User from './user/user-item';
import SearchForm from './search-form/search-form';
import { ToastContainer } from 'react-toastify';

const AllUsersPage = () => {
  const apiService = new ApiService();
  const [users, setUsers] = useState<TypeUser[]>([]);
  const [filtredUsers, setFiltredUsers] = useState<TypeUser[]>([]);

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
        followers,
        about,
      }: {
        _id: string;
        name: string;
        image: string;
        age: number;
        location: string;
        followers: string[];
        about: string;
      }) => {
        return (
          <User
            key={_id}
            _id={_id}
            name={name}
            image={image}
            age={age}
            location={location}
            followers={followers}
            about={about}
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
      />
      {filtredUsers.length ? renderUsers(filtredUsers) : null}
    </div>
  );
};

export default AllUsersPage;
