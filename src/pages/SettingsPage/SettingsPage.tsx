import classes from './SettingsPage.module.css';
import Avatar from '../../components/avatar';
import InputFile from '../../components/input/InputFile/InputFile';
import { useState } from 'react';
import InputText from '../../components/input/InputText/InputText';
import InputEmail from '../../components/input/InputEmail/InputEmail';
import InputTextArea from '../../components/input/InputTextArea/InputTextArea';
import { Button } from 'antd';
import { useUser } from '../../hooks/useUser';
import { TypeUser } from '../../types/types';
import { ToastContainer, toast } from 'react-toastify';

const SettingsPage = () => {
  const authContext = useUser();
  const user = authContext.user as TypeUser;

  const [image, setImage] = useState(user.image);
  const [name, setName] = useState(user.name.split(' ')[0]);
  const [surname, setSurname] = useState(user.name.split(' ')[1]);
  const [age, setAge] = useState(`${user.age}`);
  const [location, setLocation] = useState(user.location);
  const [email, setEmail] = useState(user.email);
  const [about, setAbout] = useState(user.about);

  const handleSumbit = () => {
    const updatedUser: TypeUser = {
      ...user,
      image,
      name: `${name} ${surname}`,
      age: Number(age),
      location,
      email,
      about,
    };
    try {
      void authContext.updateUser(updatedUser);
      toast.success('Your profile updated!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Oh no something went wrong: ${error.message}`);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <ToastContainer
        position='top-right'
        theme='colored'
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
      />
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
          value={age === '0' ? '' : `${age}`}
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
