import classes from './LoginForm.module.css';
import logo from '../../../assets/images/logo_white.png';
import InputEmail from '../../input/InputEmail/InputEmail';
import InputPassword from '../../input/InputPassword/InputPassword';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TypeUser } from '../../../types/types';
import { Link } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { login } = useUser();

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email, password]);

  const handleSubmit = () => {
    try {
      void login(email, password);
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
          <Link to='/registration'>Register</Link>
        </p>
      </div>
    </div>
  );
}

export type LoginResponse = {
  token: string;
  user: TypeUser;
};

export default LoginForm;
