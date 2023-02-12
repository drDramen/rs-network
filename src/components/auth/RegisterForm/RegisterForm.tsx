import InputText from '../../input/InputText/InputText';
import InputEmail from '../../input/InputEmail/InputEmail';
import InputPassword from '../../input/InputPassword/InputPassword';
import logo from '../../../assets/images/logo_white.png';
import classes from './RegisterForm.module.css';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function RegisterForm({ isRegister, setUserName }: RegisterProps) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const handleSubmit = async () => {
    const user = {
      name: `${name} ${surname}`,
      email,
      password,
      repeatedPassword: passwordRepeat,
    };
    try {
      const response = await fetch('http://localhost:8080/users', {
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
      const data = (await response.json()) as User;
      isRegister(true);
      setUserName(data.name.split(' ')[0]);
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      name.length > 0 &&
      surname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      passwordRepeat.length > 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, surname, email, password, passwordRepeat]);

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
          <Link to='/login'>Log in</Link>
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

type RegisterProps = {
  isRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export default RegisterForm;
