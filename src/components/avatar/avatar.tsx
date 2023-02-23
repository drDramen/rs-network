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
  return (
    <div
      style={{ cursor: cursor, display: 'inline' }}
      onClick={() => {
        if (id) navigate(`/users/${id}`);
      }}
    >
      {image === '' ? (
        <Avatar
          alt='avatar'
          size={size ? size : 'default'}
          style={{ fontSize: '9rem' }}
        >
          {name.at(0)?.toUpperCase()}
        </Avatar>
      ) : (
        <Avatar
          src={image}
          alt='avatar'
          size={size ? size : 'default'}
        />
      )}
    </div>
  );
};

export default Ava;
