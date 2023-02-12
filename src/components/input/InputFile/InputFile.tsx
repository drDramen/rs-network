/* eslint-disable @typescript-eslint/no-floating-promises */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

type InputType = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const InputFile = ({ setImage }: InputType) => (
  <Upload
    name='image'
    accept='image/png, image/jpeg'
    action='http://localhost:8080/image-upload'
    showUploadList={false}
    onChange={(info) => {
      if (info.file.status == 'done') {
        const response = info.file.response as { imageUrl: string };
        setImage(response.imageUrl);
      }
    }}
  >
    <Button icon={<UploadOutlined />}>Click to upload image</Button>
  </Upload>
);

export default InputFile;
