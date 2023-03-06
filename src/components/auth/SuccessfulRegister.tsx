import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../router';

const SuccessfulRegister = ({ name }: ResultType) => {
  const navigate = useNavigate();
  return (
    <Result
      status='success'
      title={`${name}, you successfuly registered in RS-Network!`}
      subTitle='Now you can log in to get access, and enjoy you networking'
      extra={
        <Button
          type='primary'
          onClick={() => navigate(RouteNames.Login)}
        >
          Log in
        </Button>
      }
    />
  );
};

type ResultType = {
  name: string;
};

export default SuccessfulRegister;
