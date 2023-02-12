import { useEffect, useState } from 'react';
import TextParagraph from '../../components/paragraph/TextParagraph';
import ApiService from '../../services/api-service';
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

  const apiService = new ApiService();
  const [posts, setPosts] = useState<[TypePost] | null>(null);

  useEffect(() => {
    async function getUserPosts() {
      const userPosts = await apiService.getUserPosts(currentUserId);
      setPosts(userPosts);
    }
    void getUserPosts();
  });

  // TODO: move this function from this file and from threa-posts to a single module
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
          setPosts={setPosts}
        />
      );
    });
  };

  return (
    <div className={classes.wrapper}>
      <UserInfo />
      <br />
      {user.about ? <TextParagraph weight='bold'>About</TextParagraph> : null}
      <TextParagraph size='small'>{user.about}</TextParagraph>
      <br />
      <PostForm setPosts={setPosts} />
      {posts ? renderPosts(posts.reverse()) : null}
    </div>
  );
};

export default UserPage;
