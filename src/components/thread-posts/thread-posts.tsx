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
    const setAllPostsToState = async () => {
      const allPosts: TypePost[] = await apiService.getAllPosts(user._id);
      setPosts(allPosts);
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
