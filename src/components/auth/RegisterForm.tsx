import InputText from '../input/InputText/InputText';
import InputEmail from '../input/InputEmail/InputEmail';
import InputPassword from '../input/InputPassword/InputPassword';
import logo from '../../assets/images/logo_white.png';
import classes from './RegisterForm.module.css';
import { Button } from 'antd';
import { useState, useEffect } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const handleSubmit = async (): Promise<User> => {
    const user: User = {
      name,
      email,
      password,
    };
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = (await response.json()) as User;
    console.log(data);
    return data;
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <img
          src={logo}
          alt='rs-network-logo'
        />
      </div>
      <div>
        <p className={classes.caption}>Registration</p>
        <form>
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
          <InputEmail
            placeholder='Your email'
            value={email}
            setValue={setEmail}
          />
          <InputPassword
            placeholder='Your password'
            value={password}
            setValue={setPassword}
          />
          <InputPassword
            placeholder='Repeat your password'
            value={passwordRepeat}
            setValue={setPasswordRepeat}
          />
          <Button
            disabled={isFormValid ? false : true}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit}
            className={classes.submit}
            type='primary'
            size='large'
          >
            Sign up
          </Button>
        </form>
        <p className={classes.footer}>
          Already have an account?
          <a href='#'>Log in</a>
        </p>
      </div>
    </div>
  );
}

type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age?: number;
  image?: string;
  followers?: string[];
  location?: string;
  about?: string;
};

export default RegisterForm;
