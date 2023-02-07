import { useState, useEffect } from 'react';
import { TypePost } from '../../types/types';
import ApiService from '../../services/api-service';
import Post from '../post';
import './thread-posts.css';

const TreadPosts = () => {
  const apiService = new ApiService();
  const [posts, setPosts] = useState<[TypePost] | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    apiService.getAllPosts().then((allPosts) => {
      setPosts(allPosts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          comments={comments}
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
