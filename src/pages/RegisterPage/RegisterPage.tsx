import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
import SuccessfulRegister from '../../components/auth/SuccessfulRegister';
import { useState } from 'react';

const RegisterPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userName, setUserName] = useState('');
  return (
    <>
      {isRegister ? (
        <SuccessfulRegister name={userName} />
      ) : (
        <RegisterForm
          isRegister={setIsRegister}
          setUserName={setUserName}
        />
      )}
    </>
  );
};

export default RegisterPage;
