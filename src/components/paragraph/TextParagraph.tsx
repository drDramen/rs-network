import classes from './TextParagraph.module.css';

const TextParagraph = ({
  children,
  weight,
  size,
}: {
  children: string | number;
  weight?: 'bold';
  size?: 'large' | 'small';
}) => {
  return (
    <p
      className={`${weight ? classes.bold : classes.normal} ${
        size ? (size === 'large' ? classes.large : classes.small) : classes.standart
      }`}
    >
      {children}
    </p>
  );
};

export default TextParagraph;
