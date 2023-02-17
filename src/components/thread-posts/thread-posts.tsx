/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { TypePost } from '../../types/types';
import { apiService } from '../../services/api-service';
import PostForm from './post-form';
import Post from './post';
import classes from './thread-posts.module.css';
import { useUser } from '../../hooks/useUser';
import { apiBaseUrl } from '../../api-constants';

const webSocket = io(apiBaseUrl);

const TreadPosts = () => {
  const [posts, setPosts] = useState<TypePost[]>([]);
  const [updatePost, setUpdatePost] = useState<TypePost | null>(null);
  const { user } = useUser();

  useEffect(() => {
    // TODO: refactor this method to a function
    apiService.getAllPosts(user._id).then((allPosts) => {
      setPosts(allPosts);
    });
  }, []);

  webSocket.on('new-post', () => {
    // TODO: refactor this method to a function
    apiService.getAllPosts(user._id).then((allPosts) => {
      setPosts(allPosts);
    });
  });

  webSocket.on('del-post', () => {
    // TODO: refactor this method to a function
    apiService.getAllPosts(user._id).then((allPosts) => {
      setPosts(allPosts);
    });
  });

  const renderPosts = (posts: TypePost[]) => {
    const reversePosts = [...posts].reverse();
    return reversePosts.map(
      ({ _id, description, imageUrl, userId, date, comments, likes }: TypePost) => {
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
            setPosts={setPosts}
            setUpdatePost={setUpdatePost}
          />
        );
      },
    );
  };

  if (posts.length !== 0) {
    return (
      <div className={classes.wrapper}>
        <PostForm
          updatePost={updatePost}
          setPosts={setPosts}
          setUpdatePost={setUpdatePost}
        />
        {renderPosts(posts)}
      </div>
    );
  } else {
    return null;
  }
};

export default TreadPosts;
