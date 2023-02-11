import classes from './SettingsPage.module.css';
import Avatar from '../../components/avatar';
import InputFile from '../../components/input/InputFile/InputFile';
import { useState } from 'react';
import { TypeUser } from '../../types/types';
import InputText from '../../components/input/InputText/InputText';
import InputEmail from '../../components/input/InputEmail/InputEmail';
import InputTextArea from '../../components/input/InputTextArea/InputTextArea';
import { Button } from 'antd';

const SettingsPage = () => {
  const [user, setUser] = useState<TypeUser>({
    _id: '63dce6b73d2c466b038fc8a9',
    name: 'Aleksandr Yermolaev',
    email: 'user1@example.com',
    image: '',
    age: 25,
    location: 'Kyiv',
    followers: ['63dcd6fa9c1a365e8cf6fdf3', '63dcd7599c1a365e8cf6fdf5'],
    password: '',
    about:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
  });

  const [image, setImage] = useState(user.image);
  const [name, setName] = useState(user.name.split(' ')[0]);
  const [surname, setSurname] = useState(user.name.split(' ')[1]);
  const [age, setAge] = useState(`${user.age}`);
  const [location, setLocation] = useState(user.location);
  const [email, setEmail] = useState(user.email);
  const [about, setAbout] = useState(user.about);

  const handleSumbit = () => {
    console.log('sumbmit');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.avatar}>
        <Avatar
          image={image}
          name={name}
          size={{ xs: 180, sm: 180, md: 210, lg: 210, xl: 230, xxl: 280 }}
        ></Avatar>
        <InputFile setImage={setImage} />
      </div>
      <div>
        <InputText
          placeholder='Your name'
          value={name}
          setValue={setName}
        />
        <InputText
          placeholder='Your surname'
          value={surname}
          setValue={setSurname}
        />
        <InputText
          placeholder='Your age'
          value={`${age}`}
          setValue={setAge}
        />
        <InputText
          placeholder='Your location'
          value={location}
          setValue={setLocation}
        />
        <InputEmail
          placeholder='Your email'
          value={email}
          setValue={setEmail}
        />
        <InputTextArea
          placeholder='Type something about yourself...'
          value={about}
          setValue={setAbout}
        />
        <Button
          className={classes.button}
          type='primary'
          onClick={handleSumbit}
        >
          Update info
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
