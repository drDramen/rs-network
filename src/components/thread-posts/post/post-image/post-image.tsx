import { Image } from 'antd';
import './post-image.css';

const PostImage = ({
  url,
  className = '',
  preview = true,
}: {
  url: string;
  className?: string;
  preview?: boolean;
}) => {
  if (url != '') {
    return (
      <Image
        width={'100%'}
        src={url}
        alt='Post Image'
        className={className}
        preview={preview}
      />
    );
  } else {
    return null;
  }
};

export default PostImage;
