import { Avatar } from 'antd';

const Ava = ({
  image,
  name,
  size,
}: {
  image: string;
  name: string;
  size?: { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number };
}) => {
  if (image === '') {
    return (
      <Avatar
        alt='avatar'
        size={size ? size : 'default'}
        style={{ fontSize: '9rem' }}
      >
        {name.at(0)?.toUpperCase()}
      </Avatar>
    );
  }
  return (
    <Avatar
      src={image}
      alt='avatar'
      size={size ? size : 'default'}
    />
  );
};

export default Ava;
