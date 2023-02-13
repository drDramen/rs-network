import { useState } from 'react';
import { Input } from 'antd';

const SearchName = ({
  names,
  onFilterName,
}: {
  names: string[];
  onFilterName: (name: string) => void;
}) => {
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterName(event.target.value);
  };
  return (
    <Input
      placeholder='Enter name...'
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSearch(event)}
    />
  );
};

export default SearchName;
