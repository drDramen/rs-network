/* eslint-disable @typescript-eslint/no-floating-promises */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { apiBaseUrl } from '../../../api-constants';
import classes from './InputFile.module.css';

type InputType = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const InputFile = ({ setImage }: InputType) => (
  <Upload
    name='image'
    accept='image/png, image/jpeg'
    action={`${apiBaseUrl}image-upload`}
    showUploadList={false}
    onChange={(info) => {
      if (info.file.status == 'done') {
        const response = info.file.response as { imageUrl: string };
        setImage(response.imageUrl);
      }
    }}
  >
    <Button
      style={{}}
      className={classes.button}
      icon={<UploadOutlined style={{ color: 'var(--main-text-color)' }} />}
    >
      Click to upload image
    </Button>
  </Upload>
);

export default InputFile;
