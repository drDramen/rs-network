import './avatar.css';
import { Avatar } from 'antd';

const Ava = ({ image, name }: { image: string; name: string }) => {
  if (image === '') {
    return <Avatar alt='avatar'>{name.at(0)?.toUpperCase()}</Avatar>;
  }
  return (
    <Avatar
      src={image}
      alt='avatar'
    />
  );
};

export default Ava;
