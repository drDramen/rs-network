/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */

import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { TypeUser } from '../../../../types/types';
import dateTransformer from '../../../../services/date-transformer';
import ApiService from '../../../../services/api-service';
import Avatar from '../../../avatar';
import './comment.css';

const USER = '63dcd7599c1a365e8cf6fdf5'; // TODO only for dev, delete in prod

const Comment = ({
  _id,
  userId,
  date,
  description,
  setDeletedCommentId,
}: {
  _id: string;
  userId: string;
  date: number;
  description: string;
  setDeletedCommentId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const commentDate = dateTransformer(date);
  const apiService = new ApiService();
  const [user, setUser] = useState<TypeUser | null>(null);
  const [showTrash, setShowTrash] = useState<boolean>(false);

  useEffect(() => {
    apiService.getUser(userId).then((user) => {
      setUser(user);
    });
  }, [userId]);

  const deleteComment = () => {
    apiService.deleteComment(_id).then((deletedComment) => setDeletedCommentId(deletedComment._id));
  };

  if (user) {
    return (
      <div
        className='comment'
        onMouseEnter={() => {
          setShowTrash(true);
        }}
        onMouseLeave={() => {
          setShowTrash(false);
        }}
      >
        <Col flex={'30px'}>
          <Avatar
            image={user.image}
            name={user.name}
          />
        </Col>
        <Row className='comment-body'>
          <Row
            align='middle'
            className='comment-header'
            style={{ height: '24px' }}
          >
            <span className='comment-name'>{user.name}</span>

            <span className='comment-date'>
              {' '}
              {USER === userId && showTrash ? (
                <Button
                  className='comment-delete-btn'
                  type='link'
                >
                  {<DeleteOutlined onClick={deleteComment} />}
                </Button>
              ) : null}
              {commentDate}
            </span>
          </Row>
          <div className='comment-text'>{description}</div>
        </Row>
      </div>
    );
  } else {
    return null;
  }
};

export default Comment;
