import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const Ava = ({
  image,
  name,
  id,
  size,
}: {
  image: string;
  name: string;
  id?: string;
  size?: { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number };
}) => {
  const navigate = useNavigate();
  const cursor = id ? 'pointer' : 'auto';
  if (image === '') {
    return (
      <div
        style={{ cursor: cursor }}
        onClick={() => {
          if (id) navigate(`/users/${id}`);
        }}
      >
        <Avatar
          alt='avatar'
          size={size ? size : 'default'}
          style={{ fontSize: '9rem' }}
        >
          {name.at(0)?.toUpperCase()}
        </Avatar>
      </div>
    );
  }
  return (
    <div
      style={{ cursor: cursor }}
      onClick={() => {
        if (id) navigate(`/users/${id}`);
      }}
    >
      <Avatar
        src={image}
        alt='avatar'
        size={size ? size : 'default'}
      />
    </div>
  );
};

export default Ava;
