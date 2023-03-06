import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
import SuccessfulRegister from '../../components/auth/SuccessfulRegister';
import { useState } from 'react';

const RegisterPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userName, setUserName] = useState('');
  return (
    <div style={{ backgroundColor: 'var(--main-background)' }}>
      {isRegister ? (
        <SuccessfulRegister name={userName} />
      ) : (
        <RegisterForm
          isRegister={setIsRegister}
          setUserName={setUserName}
        />
      )}
    </div>
  );
};

export default RegisterPage;
