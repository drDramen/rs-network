import classes from './LoginForm.module.css';
import logo from '../../../assets/images/logo_white.png';
import InputEmail from '../../input/InputEmail/InputEmail';
import InputPassword from '../../input/InputPassword/InputPassword';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm({ setAuth, setUser }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email, password]);

  const handleSubmit = async () => {
    const user = {
      email,
      password,
    };
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.status === 400) {
        const error = await response.text();
        throw new Error(`${error}`);
      }
      const data = (await response.json()) as LoginResponse;
      data.user.password = '';
      setAuth(true);
      localStorage.setItem('JWT', data.token);
      setUser(data.user);
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  return (
    <div className={classes.wrapper}>
      <ToastContainer
        position='top-center'
        theme='colored'
        autoClose={5000}
        hideProgressBar={true}
        closeButton={false}
      />
      <div className={classes.logo}>
        <img
          src={logo}
          alt='rs-network-logo'
        />
      </div>
      <div className={classes.form}>
        <p className={classes.caption}>Log In</p>
        <form>
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
          <Button
            disabled={isFormValid ? false : true}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit}
            className={classes.submit}
            type='primary'
            size='large'
          >
            Sign In
          </Button>
        </form>
        <p className={classes.footer}>
          Don't have an account?
          <a href='#'>Register</a>
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

type LoginResponse = {
  token: string;
  user: User;
};

type LoginProps = {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export default LoginForm;
