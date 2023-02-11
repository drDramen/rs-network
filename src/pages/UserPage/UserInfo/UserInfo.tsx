import Avatar from '../../../components/avatar';
import TextParagraph from '../../../components/paragraph/TextParagraph';
import classes from './UserInfo.module.css';

const UserInfo = () => {
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

  return (
    <div className={classes.wrapper}>
      <Avatar
        image={user.image}
        name={user.name}
        size={{ xs: 180, sm: 180, md: 210, lg: 210, xl: 230, xxl: 280 }}
      ></Avatar>
      <div>
        <TextParagraph
          weight='bold'
          size='large'
        >
          {user.name.split(' ')[0]}
        </TextParagraph>
        <TextParagraph
          weight='bold'
          size='large'
        >
          {user.name.split(' ')[1]}
        </TextParagraph>
        <TextParagraph>{`${user.age} y.o`}</TextParagraph>
        <TextParagraph>{user.location}</TextParagraph>
        <TextParagraph>{user.email}</TextParagraph>
      </div>
    </div>
  );
};

export default UserInfo;
