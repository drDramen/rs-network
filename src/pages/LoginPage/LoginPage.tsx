import LoginForm from '../../components/auth/LoginForm/LoginForm';
import { useState } from 'react';

const LoginPage = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  return (
    <LoginForm
      setAuth={setIsAuth}
      setUser={setUser}
    />
  );
};

export default LoginPage;
