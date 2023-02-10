import { Button, Result } from 'antd';

const SuccessfulRegister = ({ name }: ResultType) => {
  return (
    <Result
      status='success'
      title={`${name}, you successfuly registered in RS-Network!`}
      subTitle='Now you can log in to get access, and enjoy you networking'
      extra={
        <Button
          type='primary'
          href='#'
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
