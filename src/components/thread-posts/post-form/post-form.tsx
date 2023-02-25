/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Button, Input, Divider } from 'antd';
import { SendOutlined, FileImageOutlined, CloseOutlined } from '@ant-design/icons';
import { apiService } from '../../../services/api-service';
import PostImage from '../../thread-posts/post/post-image';
import { TypePost } from '../../../types/types';
import './post-form.css';
import { useUser } from '../../../hooks/useUser';
import { apiBaseUrl } from '../../../api-constants';

const { TextArea } = Input;
const webSocket = io(apiBaseUrl);

const PostForm = ({
  setPosts,
  updatePost,
  setUpdatePost,
}: {
  setPosts: React.Dispatch<React.SetStateAction<TypePost[]>>;
  updatePost: TypePost | null;
  setUpdatePost: React.Dispatch<React.SetStateAction<TypePost | null>>;
}) => {
  const [postDescription, postImageUrl] = updatePost
    ? [updatePost.description, updatePost.imageUrl]
    : ['', ''];
  const postFormRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState(postDescription);
  const [imageUrl, setImageUrl] = useState(postImageUrl);
  const { user } = useUser();
  const autoSize = updatePost ? { minRows: 2 } : true;

  useEffect(() => {
    if (postFormRef.current !== null) postFormRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [updatePost]);

  useEffect(() => {
    setDescription(postDescription);
    setImageUrl(postImageUrl);
  }, [updatePost]);

  const onSubmitPost = (event: React.MouseEvent) => {
    const date = new Date().getTime();
    event.preventDefault();
    if (description || imageUrl != '') {
      if (!updatePost) {
        apiService.createPost(user._id, date, description, imageUrl).then(() => {
          webSocket.emit('new-post', 'New post created!');
          apiService.getAllPosts(user._id).then((allPosts) => {
            setPosts(allPosts);
          });
        });
      } else {
        apiService
          .updatePost({
            _id: updatePost._id,
            userId: user._id,
            date: updatePost.date,
            description: description,
            imageUrl: imageUrl,
            likes: updatePost.likes,
            comments: updatePost.comments,
          })
          .then(() => {
            webSocket.emit('new-post', 'Updated post!');
            apiService.getAllPosts(user._id).then((allPosts) => {
              setPosts(allPosts);
            });
          });
      }
      setDescription('');
      setImageUrl('');
      setUpdatePost(null);
    }
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      apiService.uploadImage(formData).then((image) => {
        setImageUrl(image.imageUrl);
      });
    }
  };

  const onDeleteImage = () => {
    setImageUrl('');
  };

  return (
    <div
      ref={postFormRef}
      className='post-form'
    >
      {imageUrl != '' ? (
        <PostImage
          url={imageUrl}
          className={'image-post-form'}
          preview={false}
        />
      ) : null}
      {imageUrl != '' ? (
        <Button
          className='delete-image-btn'
          type='link'
          size='middle'
          htmlType='submit'
          onClick={onDeleteImage}
        >
          {<CloseOutlined />}
        </Button>
      ) : null}

      <form className='text-image-input'>
        <TextArea
          style={{ padding: '4px 35px' }}
          placeholder='Write something here...'
          value={description}
          autoSize={autoSize}
          size={'large'}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onDescriptionChange(event)}
          className='post-form-input'
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
        {updatePost ? (
          <Button
            className='cancel-update-post-btn'
            type='link'
            size='middle'
            htmlType='submit'
            onClick={() => setUpdatePost(null)}
          >
            {<CloseOutlined />}
          </Button>
        ) : null}
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
