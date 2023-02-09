import { Input } from 'antd';
import classes from './InputEmail.module.css';

const InputEmail = ({ placeholder, value, setValue }: InputType) => {
  return (
    <Input
      className={classes.wrapper}
      type='email'
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
    />
  );
};

type InputType = {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default InputEmail;
