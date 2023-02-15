/* eslint-disable react-hooks/exhaustive-deps */

import { Input } from 'antd';
import { useState, useEffect } from 'react';

const SearchName = ({
  isDefault,
  setFiltredName,
}: {
  isDefault: boolean;
  setFiltredName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [currentName, setCurrentName] = useState('');

  useEffect(() => {
    if (isDefault) {
      setCurrentName('');
      setFiltredName('');
    }
  }, [isDefault]);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(event.target.value);
    setFiltredName(event.target.value);
  };

  return (
    <Input
      placeholder='Enter name...'
      value={currentName}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSearch(event)}
    />
  );
};

export default SearchName;
