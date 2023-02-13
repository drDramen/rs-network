/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */

import { useState, useEffect } from 'react';
import { TypeUser, TypePost } from '../../../types/types';
import { Divider } from 'antd';
import ApiService from '../../../services/api-service';
import PostHeader from './post-header';
import ItemAddComment from '../item-add-comment';
import PostText from './post-text';
import PostImage from './post-image';
import ThreadComments from '../thread-comments';

import './post.css';

const Post = ({
  _id,
  userId,
  description,
  imageUrl,
  date,
  comments,
  likes,
  setPosts,
}: {
  _id: string;
  userId: string;
  date: number;
  description: string;
  imageUrl: string;
  likes: string[];
  comments: string[];
  setPosts: React.Dispatch<React.SetStateAction<TypePost[]>>;
}) => {
  const apiService = new ApiService();
  const [user, setUser] = useState<TypeUser | null>(null);
  const [commentsId, setCommentsId] = useState<string[]>(comments);
  const [newCommentId, setNewCommentId] = useState<string>('');
  const [deletedCommentId, setDeletedCommentId] = useState<string>('');
  const [showTrash, setShowTrash] = useState<boolean>(false);

  useEffect(() => {
    apiService.getUser(userId).then((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (newCommentId != '') {
      setCommentsId((commentsId) => [newCommentId, ...commentsId]);
    }
  }, [newCommentId]);

  useEffect(() => {
    if (deletedCommentId != '') {
      setCommentsId((commentsId) =>
        commentsId.filter((commentId) => commentId !== deletedCommentId),
      );
    }
  }, [deletedCommentId]);

  if (user) {
    return (
      <div
        className='post'
        onMouseEnter={() => {
          setShowTrash(true);
        }}
        onMouseLeave={() => {
          setShowTrash(false);
        }}
      >
        <PostHeader
          userId={userId}
          postId={_id}
          name={user.name}
          image={user.image}
          date={date}
          likes={likes}
          showTrash={showTrash}
          setPosts={setPosts}
        />
        <PostImage url={imageUrl} />
        <PostText text={description} />
        <Divider className='post-divider' />
        <ItemAddComment
          postId={_id}
          setNewComment={setNewCommentId}
        />
        {commentsId.length ? (
          <ThreadComments
            commentsId={commentsId}
            setDeletedCommentId={setDeletedCommentId}
          />
        ) : null}
      </div>
    );
  } else {
    return user;
  }
};

export default Post;
