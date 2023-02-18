/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import TextParagraph from '../../components/paragraph/TextParagraph';
import { apiService } from '../../services/api-service';
import { ToastContainer } from 'react-toastify';
import { TypePost } from '../../types/types';
import UserInfo from './UserInfo/UserInfo';
import Post from '../../components/thread-posts/post';
import classes from './UserPage.module.css';
import { useUser } from '../../hooks/useUser';
import PostForm from '../../components/thread-posts/post-form';

const UserPage = () => {
  const currentId = location.pathname.split('/')[2];
  const { user } = useUser();
  const currentUserId = currentId === user._id ? user._id : currentId;

  const [posts, setPosts] = useState<TypePost[]>([]);
  const [currentUser, setCurrentUser] = useState(user);
  const [updatePost, setUpdatePost] = useState<TypePost | null>(null);

  useEffect(() => {
    async function getUserPosts() {
      const userPosts = await apiService.getUserPosts(currentUserId);
      setPosts(userPosts);
    }
    void getUserPosts();
  });

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
      <UserInfo setCurrentUser={setCurrentUser} />
      <br />
      {currentUser.about ? <TextParagraph weight='bold'>About</TextParagraph> : null}
      <TextParagraph size='small'>{currentUser.about}</TextParagraph>
      <br />
      {currentId === user._id ? (
        <PostForm
          updatePost={updatePost}
          setPosts={setPosts}
          setUpdatePost={setUpdatePost}
        />
      ) : null}
      {posts ? renderPosts(posts) : null}
    </div>
  );
};

export default UserPage;
