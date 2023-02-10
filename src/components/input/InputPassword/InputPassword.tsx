import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import classes from './InputPassword.module.css';

const InputPassword = ({ placeholder, value, setValue }: InputType) => {
  return (
    <Input.Password
      className={classes.wrapper}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  );
};

type InputType = {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default InputPassword;
