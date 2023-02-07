import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './item-add-comment.css';

const ItemAddComment = () => {
  const [comment, setComment] = useState('');

  const onSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (comment) {
      alert(comment);
    }
    setComment('');
  };

  const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <form className='add-comment-form'>
      <Input
        placeholder='Add comment...'
        value={comment}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onCommentChange(event)}
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
