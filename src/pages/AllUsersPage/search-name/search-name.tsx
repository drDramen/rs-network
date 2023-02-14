import { Input } from 'antd';

const SearchName = ({
  setFiltredName,
}: {
  setFiltredName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltredName(event.target.value);
  };

  return (
    <Input
      placeholder='Enter name...'
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSearch(event)}
    />
  );
};

export default SearchName;
