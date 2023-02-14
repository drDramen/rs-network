/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';

const SearchLocation = ({
  locations,
  setFiltredLocation,
}: {
  locations: string[];
  setFiltredLocation: React.Dispatch<React.SetStateAction<string>>;
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
    if (value == '' && !locations.includes(value)) {
      setFiltredLocation(value);
    }
  }, [value]);

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
