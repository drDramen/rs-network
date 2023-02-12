import { Input } from 'antd';
import classes from './InputTextArea.module.css';
const { TextArea } = Input;

const InputTextArea = ({ placeholder, value, setValue }: InputType) => {
  return (
    <TextArea
      className={classes.wrapper}
      rows={4}
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

export default InputTextArea;
