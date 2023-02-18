import { useState } from 'react';
import { Typography } from 'antd';
import './post-comment-text.css';

const { Text } = Typography;

const PostCommentText = ({ text, length }: { text: string; length: number }) => {
  const [isReadMoreShow, setReadMoreShow] = useState(false);

  const toggleBtn = () => {
    setReadMoreShow((prevState) => !prevState);
  };
  return (
    <div className='text'>
      <Text className='text'>
        {isReadMoreShow ? text : text.slice(0, length)}
        {text.length > length ? (
          <button
            className='read-more-less-btn'
            onClick={toggleBtn}
          >
            {isReadMoreShow ? 'Read less' : '...Read more'}
          </button>
        ) : null}
      </Text>
    </div>
  );
};

export default PostCommentText;
