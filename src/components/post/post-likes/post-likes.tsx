import { useState, useEffect } from 'react';
import { TypeUser } from '../../../types/types';
import { Button, Modal } from 'antd';
import ApiService from '../../../services/api-service';
import Avatar from '../../avatar';
import './post-likes.css';

const LikesModal = ({ likes }: { likes: string[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiService = new ApiService();
  const [users, setUsers] = useState<TypeUser[] | null>(null);
  const [userId, setUserId] = useState<string>(likes[0]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-shadow
    apiService.getUser(userId).then((user) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setUsers((users) => {
        if (userId != likes[likes.length - 1]) {
          const currentPos = likes.indexOf(userId);
          setUserId(likes[currentPos + 1]);
        }
        return users != null ? [...users, user] : [user];
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    setUsers(null);
    setUserId(likes[0]);
  }, [likes]);

  const showLikers = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderLikers = (arr: TypeUser[]) => {
    return arr.map(({ _id, name, image }: { _id: string; name: string; image: string }) => {
      return (
        <div
          className='like-user'
          key={_id}
        >
          <Avatar
            image={image}
            name={name}
          />
          <span className='like-name'>{name}</span>
        </div>
      );
    });
  };

  return (
    <>
      <Button
        className='post-like-number'
        style={{ padding: '1px 0 0 0', color: '#000000' }}
        type='link'
        size='small'
        onClick={showLikers}
      >
        {likes.length}
      </Button>
      {users && (
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {renderLikers(users)}
        </Modal>
      )}
    </>
  );
};

export default LikesModal;
