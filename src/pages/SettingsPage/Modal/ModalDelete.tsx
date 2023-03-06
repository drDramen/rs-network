import { DeleteTwoTone } from '@ant-design/icons';
import { Modal, ButtonProps } from 'antd';
import InputEmail from '../../../components/input/InputEmail/InputEmail';
import classes from './ModalDelete.module.css';
import { useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { apiService } from '../../../services/api-service';

const ModalDelele = ({
  modalOpen,
  setModalOpen,
  isDelete,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [emailValue, setEmailValue] = useState('');
  const { user, logOut } = useUser();

  const okButtonProps: ButtonProps =
    emailValue === user.email
      ? {
          type: 'primary',
          danger: true,
          className: classes.ok_button,
          disabled: false,
        }
      : {
          type: 'primary',
          danger: true,
          className: classes.ok_button,
          disabled: true,
        };
  const cancelButtonProps: ButtonProps = {
    className: classes.cancel_button,
  };

  const handleDelete = async () => {
    await apiService.deleteUser(user._id);
    setModalOpen(false);
    isDelete(true);
    setTimeout(() => {
      logOut();
    }, 3000);
  };

  return (
    <Modal
      title={
        <div className={classes.title}>
          <DeleteTwoTone
            twoToneColor='#ff0000'
            style={{ fontSize: '3rem' }}
          />
          <h2>Delete account?</h2>
        </div>
      }
      centered
      open={modalOpen}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      okText='Delete account'
      onOk={() => void handleDelete()}
      onCancel={() => setModalOpen(false)}
      closable={false}
      style={{ backgroundColor: 'var(--post-background)', color: 'var(--main-text-color)' }}
    >
      <ul className={classes.body_text}>
        <li>Your personal data will be deleted</li>
        <li>All your content (posts, comments and messages) will remain</li>
        <li>
          <strong>This action can't be undone!</strong>
        </li>
      </ul>
      <span className={classes.label}>Write your email, to confirm deletion</span>
      <InputEmail
        placeholder=''
        value={emailValue}
        setValue={setEmailValue}
      />
    </Modal>
  );
};

export default ModalDelele;
