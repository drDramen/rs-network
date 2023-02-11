/* eslint-disable @typescript-eslint/no-floating-promises */

import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import ApiService from '../../../services/api-service';
import './item-add-comment.css';

const { TextArea } = Input;
const USER = '63dcd7599c1a365e8cf6fdf5';

const ItemAddComment = ({
  postId,
  setNewComment,
}: {
  postId: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const apiService = new ApiService();
  const [comment, setComment] = useState('');

  const onSubmit = (event: React.MouseEvent) => {
    const date = new Date().getTime();
    event.preventDefault();
    if (comment) {
      apiService.addComment(postId, USER, date, comment).then((newComment) => {
        setNewComment(newComment._id);
      });
    }
    setComment('');
  };

  const onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  return (
    <form className='add-comment-form'>
      <TextArea
        autoSize={true}
        style={{ padding: '4px 35px 4px 11px' }}
        placeholder='Add comment...'
        value={comment}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onCommentChange(event)}
      />
      <Button
        className='add-comment-btn'
        type='link'
        size='middle'
        htmlType='submit'
        onClick={(event: React.MouseEvent) => onSubmit(event)}
      >
        {<SendOutlined />}
      </Button>
    </form>
  );
};

export default ItemAddComment;
