/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import TextParagraph from '../../components/paragraph/TextParagraph';
import { apiService } from '../../services/api-service';
import { toast, ToastContainer } from 'react-toastify';
import { TypePost, TypeUser } from '../../types/types';
import UserInfo from './UserInfo/UserInfo';
import Post from '../../components/thread-posts/post';
import classes from './UserPage.module.css';
import { useUser } from '../../hooks/useUser';
import PostForm from '../../components/thread-posts/post-form';
import { useLocation } from 'react-router-dom';
import LoadSpinner from '../../components/load-spinner/LoadSpinner';

const UserPage = () => {
  const currentId = useLocation().pathname.split('/')[2];
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<TypePost[]>([]);
  const [currentUser, setCurrentUser] = useState({} as TypeUser);
  const [updatePost, setUpdatePost] = useState<TypePost | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const currentUserId = currentId === user._id ? user._id : currentId;

    (async () => {
      const userPosts = await apiService.getUserPosts(currentUserId);
      const crntUser = await apiService.getUser(currentUserId);
      setPosts(userPosts);
      setCurrentUser(crntUser);
    })()
      .catch((err) => {
        const error = err as Error;
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [currentId, user._id]);

  // TODO: move this function from this file and from threa-posts to a single module
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
            isUserPage={true}
          />
        );
      },
    );
  };

  return (
    <div className={classes.wrapper}>
      <ToastContainer
        position='top-center'
        theme='colored'
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
      />

      {isLoading ? (
        <LoadSpinner />
      ) : (
        <>
          <UserInfo currentUser={currentUser} />
          <br />
          {currentUser.about ? <TextParagraph weight='bold'>About</TextParagraph> : null}
          <TextParagraph size='small'>{currentUser.about}</TextParagraph>
          <br />
          {currentId === user._id ? (
            <PostForm
              updatePost={updatePost}
              setPosts={setPosts}
              setUpdatePost={setUpdatePost}
              isUserPage={true}
            />
          ) : null}
          {posts.length ? renderPosts(posts) : null}
        </>
      )}
    </div>
  );
};

export default UserPage;
