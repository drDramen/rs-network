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
import LoadSpinner from '../load-spinner/LoadSpinner';

const webSocket = io(apiBaseUrl);

const TreadPosts = () => {
  const [posts, setPosts] = useState<TypePost[]>([]);
  const [updatePost, setUpdatePost] = useState<TypePost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const setAllPostsToState = async () => {
      setIsLoading(true);
      const allPosts: TypePost[] = await apiService.getAllPosts(user._id);
      setPosts(allPosts);
      setIsLoading(false);
    };

    setAllPostsToState().catch(() => {});

    webSocket.on('new-post', () => {
      setAllPostsToState().catch(() => {});
    });

    webSocket.on('del-post', () => {
      setAllPostsToState().catch(() => {});
    });

    return () => {
      webSocket.off('new-post');
      webSocket.off('del-post');
    };
  }, []);

  const renderPosts = (postsData: TypePost[]) => {
    const reversePosts = [...postsData].reverse();
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

  return (
    <div className={classes.wrapper}>
      <PostForm
        updatePost={updatePost}
        setPosts={setPosts}
        setUpdatePost={setUpdatePost}
      />
      {!isLoading && renderPosts(posts)}
      {isLoading && <LoadSpinner />}
    </div>
  );
};

export default TreadPosts;
