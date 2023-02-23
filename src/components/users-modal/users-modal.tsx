/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { TypeUser } from '../../types/types';
import { Button, Modal } from 'antd';
import { apiService } from '../../services/api-service';
import Avatar from '../avatar';
import './users-modal.css';

const UsersModal = ({ usersId, userName }: { usersId: string[]; userName?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<TypeUser[] | null>(null);
  const [userId, setUserId] = useState<string>(usersId[0]);

  useEffect(() => {
    apiService.getUser(userId).then((user) => {
      setUsers((users) => {
        if (userId != usersId[usersId.length - 1]) {
          const currentPos = usersId.indexOf(userId);
          setUserId(usersId[currentPos + 1]);
        }
        return users != null ? [...users, user] : [user];
      });
    });
  }, [userId]);

  useEffect(() => {
    setUsers(null);
    setUserId(usersId[0]);
  }, [usersId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderUsers = (arr: TypeUser[]) => {
    return arr.map(({ _id, name, image }: { _id: string; name: string; image: string }) => {
      return (
        <div
          className='modal-user'
          key={_id}
        >
          <Avatar
            image={image}
            name={name}
          />
          <span className='modal-name'>{name}</span>
        </div>
      );
    });
  };

  return (
    <>
      {userName ? (
        <Button
          block
          type='primary'
          style={{ padding: '0px', maxWidth: '88px' }}
          onClick={showModal}
        >
          Followings
        </Button>
      ) : (
        <Button
          style={{ padding: '1px 0 0 0', color: '#000000' }}
          type='link'
          size='small'
          onClick={showModal}
        >
          {usersId.length}
        </Button>
      )}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {users ? (
          renderUsers(users)
        ) : (
          <span className='modal-name'>
            {`${userName ? userName : 'User'} is not following anyone!`}
          </span>
        )}
      </Modal>
    </>
  );
};

export default UsersModal;
