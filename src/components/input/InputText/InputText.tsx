import { Input } from 'antd';
import classes from './InputText.module.css';

const InputText = ({ placeholder, value, setValue }: InputType) => {
  return (
    <Input
      className={classes.wrapper}
      type='text'
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

export default InputText;
