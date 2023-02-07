import { TypeUser, TypeComment } from '../../types/types';
import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import dateTransformer from '../../services/date-transformer';
import ApiService from '../../services/api-service';
import Avatar from '../avatar';
import './comment.css';

const Comment = ({ userId, date, description }: TypeComment) => {
  const commentDate = dateTransformer(date);
  const apiService = new ApiService();
  const [user, setUser] = useState<TypeUser | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-shadow
    apiService.getUser(userId).then((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setUser(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (user) {
    return (
      <div className='comment'>
        <Col flex={'30px'}>
          <Avatar
            image={user.image}
            name={user.name}
          />
        </Col>
        <Row className='comment-body'>
          <Row className='comment-header'>
            <span className='comment-name'>{user.name}</span>
            <span className='comment-date'>{commentDate}</span>
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
