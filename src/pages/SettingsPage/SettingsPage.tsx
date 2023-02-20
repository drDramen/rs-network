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
import isEmailValid from '../../services/isEmailValid';

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
    if (name.toLowerCase() === 'user') {
      toast.error(`Name ${name} is forbidden!`);
      return;
    }
    if (surname.toLowerCase() === 'deleted') {
      toast.error(`Surname ${surname} is forbidden!`);
      return;
    }
    if (!isEmailValid(email)) {
      toast.error('Email is invalid!');
      return;
    }
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
        <div>
          <span className={classes.label}>Name:</span>
          <InputText
            placeholder='Your name'
            value={name}
            setValue={setName}
          />
        </div>
        <div>
          <span className={classes.label}>Surname:</span>
          <InputText
            placeholder='Your surname'
            value={surname}
            setValue={setSurname}
          />
        </div>
        <div>
          <span className={classes.label}>Age:</span>
          <InputText
            placeholder='Your age'
            value={age === '0' ? '' : `${age}`}
            setValue={setAge}
          />
        </div>
        <div>
          <span className={classes.label}>Location:</span>
          <InputText
            placeholder='Your location'
            value={location}
            setValue={setLocation}
          />
        </div>
        <div>
          <span className={classes.label}>E-mail:</span>
          <InputEmail
            placeholder='Your email'
            value={email}
            setValue={setEmail}
          />
        </div>
        <div>
          <span className={classes.label}>About:</span>
          <InputTextArea
            placeholder='Type something about yourself...'
            value={about}
            setValue={setAbout}
          />
        </div>
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
