import { useState, useEffect } from 'react';
import { TypeUser, TypePost } from '../../types/types';
import { Divider } from 'antd';
import ApiService from '../../services/api-service';
import PostHeader from './post-header';
import ItemAddComment from '../item-add-comment';
import PostText from './post-text';
import PostImage from './post-image';
import ThreadComments from '../thread-comments';
import './post.css';

const Post = ({ _id, userId, description, imageUrl, date, comments, likes }: TypePost) => {
  const apiService = new ApiService();
  const [user, setUser] = useState<TypeUser | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-shadow
    apiService.getUser(userId).then((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setUser(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user) {
    return (
      <div className='post'>
        <PostHeader
          postId={_id}
          name={user.name}
          image={user.image}
          date={date}
          likes={likes}
        />
        <PostImage url={imageUrl} />
        <PostText text={description} />
        <Divider className='post-divider' />
        <ItemAddComment />
        {comments.length ? <ThreadComments postComments={comments} /> : null}
      </div>
    );
  } else {
    return user;
  }
};

export default Post;
