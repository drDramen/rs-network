import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import classes from './MessageForm.module.css';

const MessageForm = ({ handleSubmit }: { handleSubmit: () => void }) => {
  return (
    <div className={classes.form}>
      <TextArea
        className={classes.input}
        placeholder='Write your message here...'
        autoSize={{ minRows: 1, maxRows: 3 }}
        onPressEnter={handleSubmit}
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
