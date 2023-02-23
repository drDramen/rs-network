/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-shadow */

import { LikeOutlined, LikeFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { io } from 'socket.io-client';
import { Row, Col, Button } from 'antd';
import { TypePost } from '../../../../types/types';
import dateTransformer from '../../../../services/date-transformer';
import { apiService } from '../../../../services/api-service';
import UsersModal from '../../../users-modal';
import Avatar from '../../../avatar';
import './post-header.css';
import { useUser } from '../../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../../../api-constants';

const webSocket = io(apiBaseUrl);

const PostHeader = ({
  userId,
  postId,
  name,
  image,
  date,
  likes,
  showOptions,
  setPosts,
  editPost,
}: {
  userId: string;
  postId: string;
  name: string;
  image: string;
  date: number;
  likes: string[];
  showOptions: boolean;
  setPosts: React.Dispatch<React.SetStateAction<TypePost[]>>;
  editPost: () => void;
}) => {
  const postDate = dateTransformer(date);
  const [currentLikes, setCurrentLikes] = useState<string[]>(likes);
  const { user } = useUser();
  const navigate = useNavigate();

  const onLike = () => {
    apiService.likes(postId, user._id).then((likes) => {
      setCurrentLikes(likes);
    });
  };

  const deletePost = () => {
    apiService.deletePost(postId).then(() => {
      apiService.getAllPosts(user._id).then((allPosts) => {
        setPosts(allPosts);
        webSocket.emit('del-post', 'Post deleted!');
      });
    });
  };

  return (
    <Row
      className='post-header'
      justify='space-between'
    >
      <Avatar
        id={userId}
        image={image}
        name={name}
      />
      <Col className='name-date'>
        <div
          className='post-name'
          onClick={() => navigate(`/users/${userId}`)}
        >
          {name}
        </div>
        <div className='post-date'>{postDate}</div>
      </Col>
      {user._id === userId && showOptions ? (
        <>
          <Button
            style={{ padding: '4px' }}
            type='link'
            size='large'
          >
            <EditOutlined onClick={editPost} />
          </Button>
          <Button
            style={{ padding: '4px' }}
            type='link'
            size='large'
          >
            <DeleteOutlined onClick={deletePost} />
          </Button>
        </>
      ) : null}
      <Row className='post-like'>
        {currentLikes.length ? <UsersModal usersId={currentLikes} /> : null}
        <Button
          style={{ padding: '4px' }}
          type='link'
          size='large'
        >
          {currentLikes.includes(user._id) ? (
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
