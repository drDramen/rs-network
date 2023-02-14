/* eslint-disable react-hooks/exhaustive-deps */
import SearchLocation from '../search-location/search-location';
import SearchName from '../search-name/search-name';
import SearchAge from '../search-age/search-age';
import { useEffect, useState } from 'react';
import { Divider, Row, Col, Button } from 'antd';
import { TypeUser } from '../../../types/types';

const SearchForm = ({
  users,
  filtredUsers,
  setFiltredUsers,
}: {
  users: TypeUser[];
  filtredUsers: TypeUser[];
  setFiltredUsers: React.Dispatch<React.SetStateAction<TypeUser[]>>;
}) => {
  const [filtredName, setFiltredName] = useState<string>('');
  const [filtredLocation, setFiltredLocation] = useState<string>('');

  const allLocations = filtredUsers.map((user) => user.location);
  const locations = Array.from(new Set(allLocations)).filter((el) => el != '');

  // const allNames = filtredUsers.map((user) => user.name);
  // const names = Array.from(new Set(allNames)).filter((el) => el != '');

  const onReset = () => {
    setFiltredUsers(users);
  };

  useEffect(() => {
    const newUsers = users.filter((user) => {
      if (filtredLocation === '') {
        return user.name.toUpperCase().includes(filtredName.toUpperCase());
      } else {
        return (
          user.name.toUpperCase().includes(filtredName.toUpperCase()) &&
          user.location == filtredLocation
        );
      }
    });

    setFiltredUsers(newUsers);
  }, [filtredName, filtredLocation]);

  return (
    <div>
      <Row>
        <Col
          style={{ display: 'flex', alignItems: 'center' }}
          span={3}
        >
          Name:
        </Col>
        <Col span={21}>
          <SearchName setFiltredName={setFiltredName} />
        </Col>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Col
          style={{ display: 'flex', alignItems: 'center' }}
          span={3}
        >
          Location:
        </Col>
        <Col span={21}>
          <SearchLocation
            locations={locations}
            setFiltredLocation={setFiltredLocation}
          />
        </Col>
      </Row>
      <Row>
        <Col
          style={{ display: 'flex', alignItems: 'center' }}
          span={3}
        >
          Age:
        </Col>
        <Col span={21}>
          <SearchAge />
        </Col>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Col flex='120px'>
          <Button
            block
            type='primary'
            onClick={onReset}
          >
            Reset
          </Button>
        </Col>
      </Row>
      <Divider style={{ margin: '15px 0' }} />
    </div>
  );
};

export default SearchForm;
