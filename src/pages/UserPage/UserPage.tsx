import { useEffect, useState } from 'react';
import TextParagraph from '../../components/paragraph/TextParagraph';
import ApiService from '../../services/api-service';
import { TypePost, TypeUser } from '../../types/types';
import UserInfo from './UserInfo/UserInfo';
import Post from '../../components/thread-posts/post';
import classes from './UserPage.module.css';

const UserPage = () => {
  // TODO: get this user data from global storage
  const user = {
    id: '63dce6b73d2c466b038fc8a9',
    name: 'Aleksandr Yermolaev',
    email: 'user1@example.com',
    image: 'https://avatars3.githubusercontent.com/u/9384699?s=400&v=4',
    age: 25,
    location: 'Kyiv',
    followers: ['63dcd6fa9c1a365e8cf6fdf3', '63dcd7599c1a365e8cf6fdf5'],
    password: '',
    about:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
  };

  const apiService = new ApiService();
  const [posts, setPosts] = useState<[TypePost] | null>(null);

  useEffect(() => {
    async function getUserPosts() {
      const userPosts = await apiService.getUserPosts(user.id);
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
        />
      );
    });
  };

  return (
    <div className={classes.wrapper}>
      <UserInfo />
      <br />
      <TextParagraph weight='bold'>About</TextParagraph>
      <TextParagraph size='small'>{user.about}</TextParagraph>
      <br />
      {posts ? renderPosts(posts) : null}
    </div>
  );
};

export default UserPage;
