/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';
import './search-location.css';

const SearchLocation = ({
  locations,
  setFiltredLocation,
  isDefault,
}: {
  locations: string[];
  setFiltredLocation: React.Dispatch<React.SetStateAction<string>>;
  isDefault: boolean;
}) => {
  const allLocations = locations.map((location) => {
    return { value: location };
  });

  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ value: string }[]>(allLocations);

  useEffect(() => {
    setOptions(allLocations);
  }, [locations]);

  useEffect(() => {
    if (value == '') {
      setFiltredLocation(value);
    }
  }, [value]);

  useEffect(() => {
    if (isDefault) {
      setValue('');
    }
  }, [isDefault]);

  const onSearch = (searchText: string) => {
    setOptions(
      allLocations.filter(
        (elem) => elem.value.toUpperCase().indexOf(searchText.toUpperCase()) == 0,
      ),
    );
  };

  const onSelect = (data: string) => {
    setFiltredLocation(data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <AutoComplete
      value={value}
      options={options}
      style={{ width: '100%' }}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      placeholder='Enter location...'
    />
  );
};

export default SearchLocation;
