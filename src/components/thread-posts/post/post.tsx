/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */

import React, { useState, useEffect } from 'react';
import { TypeUser, TypePost, TypeComment } from '../../../types/types';
import { Divider } from 'antd';
import { apiService } from '../../../services/api-service';
import PostHeader from './post-header';
import ItemAddComment from '../item-add-comment';
import PostCommentText from '../../post-comment-text';
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
  setUpdatePost,
}: {
  _id: string;
  userId: string;
  date: number;
  description: string;
  imageUrl: string;
  likes: string[];
  comments: string[];
  setPosts: React.Dispatch<React.SetStateAction<TypePost[]>>;
  setUpdatePost: React.Dispatch<React.SetStateAction<TypePost | null>>;
}) => {
  const [user, setUser] = useState<TypeUser | null>(null);
  const [commentsId, setCommentsId] = useState<string[]>(comments);
  const [newCommentId, setNewCommentId] = useState<string>('');
  const [deletedCommentId, setDeletedCommentId] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [updateComment, setUpdateComment] = useState<TypeComment | null>(null);

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

  const editPost = () => {
    setUpdatePost({ _id, userId, date, description, imageUrl, likes, comments });
  };

  if (user) {
    return (
      <div
        className='post'
        onMouseEnter={() => {
          setShowOptions(true);
        }}
        onMouseLeave={() => {
          setShowOptions(false);
        }}
      >
        <PostHeader
          userId={userId}
          postId={_id}
          name={user.name}
          image={user.image}
          date={date}
          likes={likes}
          showOptions={showOptions}
          setPosts={setPosts}
          editPost={editPost}
        />
        <PostImage url={imageUrl} />
        <PostCommentText
          text={description}
          length={340}
        />
        <Divider className='post-divider' />
        <ItemAddComment
          postId={_id}
          updateComment={updateComment}
          setNewComment={setNewCommentId}
          setUpdateComment={setUpdateComment}
        />
        {commentsId.length ? (
          <ThreadComments
            commentsId={commentsId}
            updateComment={updateComment}
            setDeletedCommentId={setDeletedCommentId}
            setUpdateComment={setUpdateComment}
          />
        ) : null}
      </div>
    );
  } else {
    return user;
  }
};

export default Post;
