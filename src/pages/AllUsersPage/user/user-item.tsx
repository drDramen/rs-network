/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TypeUser } from '../../../types/types';
import { useUser } from '../../../hooks/useUser';
import { toast } from 'react-toastify';
import Avatar from '../../../components/avatar';
import './user-item.css';

const User = ({
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
  const authContext = useUser();
  const user = authContext.user as TypeUser;
  const navigate = useNavigate();

  const isFolower: boolean = user.followers.includes(_id);
  const onFollow = () => {
    const updatedUser: TypeUser = {
      ...user,
      followers: [...user.followers, _id],
    };
    try {
      void authContext.updateUser(updatedUser);
      toast.info(`You have followed to ${name}!`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Oh no something went wrong: ${error.message}`);
      }
    }
  };

  const onUnfollow = () => {
    const indx = user.followers.findIndex((id) => id === _id);
    const newFollowers = [...user.followers.slice(0, indx), ...user.followers.slice(indx + 1)];
    const updatedUser: TypeUser = {
      ...user,
      followers: newFollowers,
    };
    try {
      void authContext.updateUser(updatedUser);
      toast.info(`You have unfollowed to ${name}!`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Oh no something went wrong: ${error.message}`);
      }
    }
  };

  const onMessage = () => {
    toast('This feature is under development', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <Row className={'user-wrapper'}>
      <Col className={'user-avatar'}>
        <Avatar
          image={image}
          name={name}
          size={{ xs: 70, sm: 70, md: 70, lg: 70, xl: 70, xxl: 70 }}
        />
      </Col>
      <Col>
        <Row
          className={'user-name'}
          onClick={() => navigate(`/users/${_id}`)}
        >
          {name}
        </Row>
        <Row>
          Age: <span className={'user-title'}>{age}</span>
        </Row>
        <Row>
          Location: <span className={'user-title'}>{location}</span>
        </Row>
      </Col>
      <Col className={'user-buttons'}>
        <div className={'user-button'}>
          {isFolower ? (
            <Button
              block
              danger
              onClick={onUnfollow}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              block
              type='primary'
              onClick={onFollow}
            >
              Follow
            </Button>
          )}
        </div>
        <div className={'user-button'}>
          <Button
            block
            type='primary'
            onClick={onMessage}
          >
            Message
          </Button>
        </div>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default User;
