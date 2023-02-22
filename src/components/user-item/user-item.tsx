/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SmileTwoTone } from '@ant-design/icons';
import { useUser } from '../../hooks/useUser';
import Avatar from '../avatar';
import FollowButton from '../buttons/FollowButton';

import './user-item.css';
import { apiService } from '../../services/api-service';

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
  const { user } = useUser();

  const onMessage = async () => {
    const userDialogs = await apiService.getUserDialogs(user._id);
    const findDialog = userDialogs.find((dialog) => dialog.members.includes(_id));
    const newDialog = findDialog ? findDialog : await apiService.createDialog(user._id, _id);
    navigate(`/messages?did=${newDialog._id}&rid=${newDialog.members[0]}-${newDialog.members[1]}`);
  };

  return (
    <Row className={'user-wrapper'}>
      <Col className={'user-avatar'}>
        <Avatar
          id={_id}
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
            <Row style={{ color: 'var(--main-text-color)' }}>
              Age: <span className={'user-title'}>{age}</span>
            </Row>
          ) : null}
          {location ? (
            <Row style={{ color: 'var(--main-text-color)' }}>
              Location: <span className={'user-title'}>{location}</span>
            </Row>
          ) : null}
        </Row>
      </Col>
      {user._id != _id ? (
        <Col className={'user-buttons'}>
          <FollowButton
            followedUserId={_id}
            followedUserName={name}
          />
          <div style={{ width: '120px' }}>
            <Button
              block
              type='primary'
              onClick={() => void onMessage()}
              style={{ backgroundColor: 'var(--primary-button-color)' }}
            >
              Message
            </Button>
          </div>
        </Col>
      ) : (
        <Col className={'user-you'}>
          It is You
          <SmileTwoTone />
        </Col>
      )}
      <Col></Col>
    </Row>
  );
};

export default UserItem;
