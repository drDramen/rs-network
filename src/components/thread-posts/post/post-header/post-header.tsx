/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-shadow */

import { LikeOutlined, LikeFilled, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import dateTransformer from '../../../../services/date-transformer';
import ApiService from '../../../../services/api-service';
import LikesModal from '../../post/post-likes';
import Avatar from '../../../avatar';
import './post-header.css';

const USER = '63dcd7599c1a365e8cf6fdf5'; // TODO only for dev, delete in prod

const PostHeader = ({
  userId,
  postId,
  name,
  image,
  date,
  likes,
  showTrash,
}: {
  userId: string;
  postId: string;
  name: string;
  image: string;
  date: number;
  likes: string[];
  showTrash: boolean;
}) => {
  const apiService = new ApiService();
  const postDate = dateTransformer(date);
  const [currentLikes, setCurrentLikes] = useState<string[]>(likes);

  useEffect(() => {}, [currentLikes]);

  const onLike = () => {
    apiService.likes(postId, USER).then((likes) => {
      setCurrentLikes(likes);
    });
  };

  return (
    <Row
      className='post-header'
      justify='space-between'
    >
      <Avatar
        image={image}
        name={name}
      />
      <Col className='name-date'>
        <div className='post-name'>{name}</div>
        <div className='post-date'>{postDate}</div>
      </Col>
      {USER === userId && showTrash ? (
        <Button
          style={{ padding: '4px' }}
          type='link'
          size='large'
        >
          {<DeleteOutlined />}
        </Button>
      ) : null}
      <Row className='post-like'>
        {currentLikes.length ? <LikesModal likes={currentLikes} /> : null}
        <Button
          style={{ padding: '4px' }}
          type='link'
          size='large'
        >
          {currentLikes.includes(USER) ? (
            <LikeFilled onClick={onLike} />
          ) : (
            <LikeOutlined onClick={onLike} />
          )}
        </Button>
      </Row>
    </Row>
  );
};

export default PostHeader;
