/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import { TypeComment } from '../../../types/types';

import ApiService from '../../../services/api-service';
import './item-add-comment.css';
import { useUser } from '../../../hooks/useUser';

const { TextArea } = Input;

const ItemAddComment = ({
  postId,
  updateComment,
  setNewComment,
  setUpdateComment,
}: {
  postId: string;
  updateComment: TypeComment | null;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  setUpdateComment: React.Dispatch<React.SetStateAction<TypeComment | null>>;
}) => {
  const apiService = new ApiService();
  const commentFormRef = useRef<HTMLInputElement>(null);
  const commentDescription = updateComment ? updateComment.description : '';
  const [comment, setComment] = useState(commentDescription);
  const { user } = useUser();
  const autoSize = updateComment ? { minRows: 2 } : true;

  // useEffect(() => {
  //   if (commentFormRef.current !== null)
  //     commentFormRef.current.scrollIntoView({ behavior: 'smooth' });
  // }, [updateComment]);

  useEffect(() => {
    setComment(commentDescription);
  }, [updateComment]);

  const onSubmit = (event: React.MouseEvent) => {
    const date = new Date().getTime();
    event.preventDefault();
    if (comment) {
      if (!updateComment) {
        apiService.addComment(postId, user._id, date, comment).then((newComment) => {
          setNewComment(newComment._id);
        });
      } else {
        apiService
          .updateComment({
            _id: updateComment._id,
            postId: postId,
            userId: user._id,
            date: updateComment.date,
            description: comment,
          })
          .then(() => {});
      }
    }
    setComment('');
    setUpdateComment(null);
  };

  const onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  return (
    <div
      ref={commentFormRef}
      className='add-comment-form'
    >
      <TextArea
        style={{ padding: '4px 35px 4px 11px' }}
        placeholder='Add comment...'
        value={comment}
        autoSize={autoSize}
        size={'large'}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onCommentChange(event)}
      />
      {updateComment ? (
        <Button
          className='cancel-update-comment-btn'
          type='link'
          size='middle'
          onClick={() => setUpdateComment(null)}
        >
          {<CloseOutlined />}
        </Button>
      ) : null}
      <Button
        className='add-comment-btn'
        type='link'
        size='middle'
        htmlType='submit'
        onClick={(event: React.MouseEvent) => onSubmit(event)}
      >
        {<SendOutlined />}
      </Button>
    </div>
  );
};

export default ItemAddComment;
