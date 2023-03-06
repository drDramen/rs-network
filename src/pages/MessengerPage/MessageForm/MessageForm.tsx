import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import classes from './MessageForm.module.css';

const MessageForm = ({
  value,
  handleSubmit,
  handleNewMessage,
  disabled,
}: {
  value: string;
  handleSubmit: () => void;
  handleNewMessage: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}) => {
  return (
    <div className={classes.form}>
      <TextArea
        disabled={disabled}
        value={value}
        className={classes.input}
        placeholder='Write your message here...'
        autoSize={{ minRows: 1, maxRows: 3 }}
        onPressEnter={handleSubmit}
        onChange={(event) => {
          handleNewMessage(event.target.value);
        }}
      />
      <Button
        disabled={disabled}
        className={classes.button}
        type='link'
        size='middle'
        onClick={handleSubmit}
      >
        {<SendOutlined />}
      </Button>
    </div>
  );
};

export default MessageForm;
