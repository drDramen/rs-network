import { useState } from 'react';
import { AutoComplete } from 'antd';

const SearchLocation = ({ locations }: { locations: string[] }) => {
  const allLocations: { value: string }[] = [];
  locations.forEach((elem) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    allLocations.push({ value: elem });
  });
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ value: string }[]>(allLocations);

  const onSearch = (searchText: string) => {
    setOptions(
      allLocations.filter(
        (elem) => elem.value.toUpperCase().indexOf(searchText.toUpperCase()) == 0,
      ),
    );
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
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
