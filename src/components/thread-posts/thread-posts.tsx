/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { TypePost } from '../../types/types';
import ApiService from '../../services/api-service';
import Post from './post';
import './thread-posts.css';

const TreadPosts = () => {
  const apiService = new ApiService();
  const [posts, setPosts] = useState<[TypePost] | null>(null);

  useEffect(() => {
    apiService.getAllPosts().then((allPosts) => {
      setPosts(allPosts);
    });
  }, []);

  const renderPosts = (arr: TypePost[]) => {
    return arr.map(({ _id, description, imageUrl, userId, date, comments, likes }: TypePost) => {
      return (
        <Post
          key={_id}
          _id={_id}
          userId={userId}
          description={description}
          imageUrl={imageUrl}
          date={date}
          comments={comments.reverse()}
          likes={likes}
        />
      );
    });
  };

  if (posts) {
    return <div>{renderPosts(posts)}</div>;
  } else {
    return null;
  }
};

export default TreadPosts;
