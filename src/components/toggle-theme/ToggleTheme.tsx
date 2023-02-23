import sunIcon from '../../assets/images/sun_icon.png';
import moonIcon from '../../assets/images/moon_icon.png';
import classes from './ToggleTheme.module.css';
import { useEffect, useState } from 'react';

const ToggleTheme = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem('isDarkMode') === 'true');

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDark);
  }, [isDark]);

  const handleClick = () => {
    setIsDark(!isDark);
    localStorage.setItem('isDarkMode', (!isDark).toString());
  };

  return (
    <div
      className={classes.wrapper}
      onClick={handleClick}
    >
      {isDark ? (
        <img
          className={classes.sun}
          src={sunIcon}
          alt='moon'
        />
      ) : (
        <img
          className={classes.moon}
          src={moonIcon}
          alt='moon'
        />
      )}
    </div>
  );
};

export default ToggleTheme;
