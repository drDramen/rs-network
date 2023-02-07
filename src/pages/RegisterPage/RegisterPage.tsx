import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
import SuccessfulRegister from '../../components/auth/SuccessfulRegister';
import { useState } from 'react';

const RegisterPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  return (
    <>
      {isRegister ? (
        <SuccessfulRegister name={user.name} />
      ) : (
        <RegisterForm
          isRegister={setIsRegister}
          setUser={setUser}
        />
      )}
    </>
  );
};

export default RegisterPage;
