/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '../avatar';
import FollowButton from '../buttons/FollowButton';

import './user-item.css';

const UserItem = ({
  _id,
  name,
  image,
  sizeAvatar,
  age,
  location,
}: {
  _id: string;
  name: string;
  image: string;
  sizeAvatar: number;
  age?: number;
  location?: string;
}) => {
  const navigate = useNavigate();

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
          size={{
            xs: sizeAvatar,
            sm: sizeAvatar,
            md: sizeAvatar,
            lg: sizeAvatar,
            xl: sizeAvatar,
            xxl: sizeAvatar,
          }}
        />
      </Col>
      <Col className={'user-information-wrapper'}>
        <Row className={'user-information'}>
          <Row
            className={'user-name'}
            onClick={() => navigate(`/users/${_id}`)}
          >
            {name}
          </Row>
          {age ? (
            <Row>
              Age: <span className={'user-title'}>{age}</span>
            </Row>
          ) : null}
          {location ? (
            <Row>
              Location: <span className={'user-title'}>{location}</span>
            </Row>
          ) : null}
        </Row>
      </Col>
      <Col className={'user-buttons'}>
        <FollowButton
          followedUserId={_id}
          followedUserName={name}
        />
        <div style={{ width: '120px' }}>
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

export default UserItem;
