import { Result } from 'antd';

const SuccessfulDelete = () => {
  return (
    <Result
      status='error'
      title='Your profile was deleted from RS-Network!'
      subTitle='Come again'
    />
  );
};

export default SuccessfulDelete;
