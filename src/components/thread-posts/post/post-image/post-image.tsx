import { Image } from 'antd';
import './post-image.css';

const PostImage = ({ url }: { url: string }) => {
  if (url != '') {
    return (
      <Image
        width={'100%'}
        src={url}
        alt='Post Image'
      />
    );
  } else {
    return null;
  }
};

export default PostImage;
