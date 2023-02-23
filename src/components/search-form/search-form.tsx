/* eslint-disable react-hooks/exhaustive-deps */

import SearchLocation from '../search-location/search-location';
import SearchName from '../search-name/search-name';
import SearchAge from '../search-age/search-age';
import { useEffect, useState } from 'react';
import { Divider, Row, Col, Button } from 'antd';
import { TypeUser } from '../../types/types';
import './search-form.css';

const SearchForm = ({
  users,
  filtredUsers,
  setFiltredUsers,
  isDefault,
}: {
  users: TypeUser[];
  filtredUsers: TypeUser[];
  setFiltredUsers: React.Dispatch<React.SetStateAction<TypeUser[]>>;
  isDefault: boolean;
}) => {
  const [filtredName, setFiltredName] = useState<string>('');
  const [filtredLocation, setFiltredLocation] = useState<string>('');
  const [filtredAge, setFiltredAge] = useState<[number, number]>([0, 120]);

  const allLocations = filtredUsers.map((user) => user.location);
  const locations = Array.from(new Set(allLocations)).filter((el) => el != '');

  const onReset = () => {
    setFiltredUsers(users);
  };

  useEffect(() => {
    const newUsers = users.filter((user) => {
      if (filtredLocation === '') {
        return (
          user.name.toUpperCase().includes(filtredName.toUpperCase()) &&
          user.age >= filtredAge[0] &&
          user.age <= filtredAge[1]
        );
      } else {
        return (
          user.name.toUpperCase().includes(filtredName.toUpperCase()) &&
          user.location == filtredLocation &&
          user.age >= filtredAge[0] &&
          user.age <= filtredAge[1]
        );
      }
    });
    setFiltredUsers(newUsers);
  }, [filtredName, filtredLocation, filtredAge]);

  return (
    <div>
      <Row>
        <Col
          style={{ display: 'flex', alignItems: 'center', color: 'var(--main-text-color)' }}
          span={3}
        >
          Name:
        </Col>
        <Col span={21}>
          <SearchName
            isDefault={isDefault}
            setFiltredName={setFiltredName}
          />
        </Col>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Col
          style={{ display: 'flex', alignItems: 'center', color: 'var(--main-text-color)' }}
          span={3}
        >
          Location:
        </Col>
        <Col span={21}>
          <SearchLocation
            locations={locations}
            setFiltredLocation={setFiltredLocation}
            isDefault={isDefault}
          />
        </Col>
      </Row>
      <Row>
        <Col
          style={{ display: 'flex', alignItems: 'center', color: 'var(--main-text-color)' }}
          span={3}
        >
          Age:
        </Col>
        <Col span={21}>
          <SearchAge
            setFiltredAge={setFiltredAge}
            isDefault={isDefault}
          />
        </Col>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Col flex='120px'>
          <Button
            block
            type='primary'
            onClick={onReset}
            className='button-reset-search'
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
