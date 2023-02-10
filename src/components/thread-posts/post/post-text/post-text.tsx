import { useState } from 'react';
import { Typography } from 'antd';
import './post-text.css';

const { Text } = Typography;

const PostText = ({ text }: { text: string }) => {
  const [isReadMoreShow, setReadMoreShow] = useState(false);

  const toggleBtn = () => {
    setReadMoreShow((prevState) => !prevState);
  };
  return (
    <div className='post-text'>
      <Text className='post-text'>
        {isReadMoreShow ? text : text.slice(0, 250)}
        {text.length > 250 ? (
          <button
            className='post-read-more-less-btn'
            onClick={toggleBtn}
          >
            {' '}
            {isReadMoreShow ? 'Read less' : '...Read more'}
          </button>
        ) : null}
      </Text>
    </div>
  );
};

export default PostText;
