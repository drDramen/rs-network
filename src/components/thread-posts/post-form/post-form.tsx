/* eslint-disable @typescript-eslint/no-floating-promises */

import React, { useEffect, useState } from 'react';
import { Button, Input, Divider } from 'antd';
import { SendOutlined, FileImageOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ApiService from '../../../services/api-service';
import PostImage from '../../thread-posts/post/post-image';
import { TypePost } from '../../../types/types';
import './post-form.css';

const { TextArea } = Input;

const USER = '63dcd7599c1a365e8cf6fdf5';

const PostForm = ({
  setPosts,
}: {
  setPosts: React.Dispatch<React.SetStateAction<[TypePost] | null>>;
}) => {
  const apiService = new ApiService();
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {}, [imageUrl]);

  const onSubmitPost = (event: React.MouseEvent) => {
    const date = new Date().getTime();
    event.preventDefault();
    if (description || imageUrl != '') {
      apiService.createPost(USER, date, description, imageUrl).then(() => {
        apiService.getAllPosts().then((allPosts) => {
          setPosts(allPosts);
        });
      });
      setDescription('');
      setImageUrl('');
    }
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      console.log(event.target.files[0]);
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      console.log(formData.get('image'));
      apiService.uploadImage(formData).then((image) => {
        setImageUrl(image.imageUrl);
      });
    }
  };

  const onDeleteImage = () => {
    setImageUrl('');
  };

  return (
    <div className='post-form'>
      {imageUrl != '' ? <PostImage url={imageUrl} /> : null}
      {imageUrl != '' ? (
        <Button
          className='delete-image-btn'
          type='link'
          size='middle'
          htmlType='submit'
          onClick={onDeleteImage}
        >
          {<CloseCircleOutlined />}
        </Button>
      ) : null}

      <form className='text-image-input'>
        <TextArea
          style={{ padding: '4px 35px' }}
          placeholder='Write something here...'
          value={description}
          autoSize={true}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onDescriptionChange(event)}
        />
        <input
          className='add-image-input'
          id='add-image'
          type='file'
          accept='image/*,.png,.jpg,.jpeg,.gif,.web,'
          onChange={(event) => uploadImage(event)}
        />
        <label
          className='add-image-btn'
          htmlFor='add-image'
        >
          <FileImageOutlined className='add-image-logo' />
        </label>
        <Button
          className='add-post-btn'
          type='link'
          size='middle'
          htmlType='submit'
          onClick={(event: React.MouseEvent) => onSubmitPost(event)}
        >
          {<SendOutlined />}
        </Button>
      </form>
      <Divider />
    </div>
  );
};

export default PostForm;