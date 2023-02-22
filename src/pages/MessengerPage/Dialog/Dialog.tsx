import classes from './Dialog.module.css';
import Avatar from '../../../components/avatar';
import { TypeDialog, TypeUser } from '../../../types/types';
import { useState, useEffect } from 'react';
import { useUser } from '../../../hooks/useUser';
import { apiService } from '../../../services/api-service';

const Dialog = ({ dialog, active }: { dialog: TypeDialog; active: boolean }) => {
  const [friend, setFriend] = useState<TypeUser>({
    _id: '',
    name: '',
    email: '',
    image: '',
    age: 0,
    location: '',
    followers: [],
    password: '',
    about: '',
  });
  const { user } = useUser();

  useEffect(() => {
    const friendId = dialog.members.find((member) => member !== user._id) as string;

    const getFriend = async () => {
      setFriend(await apiService.getUser(friendId));
    };
    void getFriend();
  }, [dialog.members, user._id]);

  return (
    <div className={active ? `${classes.dialog} ${classes.active}` : classes.dialog}>
      <Avatar
        image={friend.image}
        name={friend.name}
        size={{ xs: 45, sm: 45, md: 45, lg: 45, xl: 45, xxl: 45 }}
      ></Avatar>
      <p style={{ color: 'var(--main-text-color)' }}>{friend.name}</p>
    </div>
  );
};

export default Dialog;
