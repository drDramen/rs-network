import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import classes from './MessageForm.module.css';

const MessageForm = ({
  value,
  handleSubmit,
  handleNewMessage,
}: {
  value: string;
  handleSubmit: () => void;
  handleNewMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={classes.form}>
      <TextArea
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
