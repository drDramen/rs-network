import classes from './Dialog.module.css';
import Avatar from '../../../components/avatar';

const Dialog = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className={classes.dialog}>
      <Avatar
        image={image}
        name={name}
        size={{ xs: 45, sm: 45, md: 45, lg: 45, xl: 45, xxl: 45 }}
      ></Avatar>
      <p>{name}</p>
    </div>
  );
};

export default Dialog;
