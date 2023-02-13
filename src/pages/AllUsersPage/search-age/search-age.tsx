/* eslint-disable @typescript-eslint/no-shadow */
import { Row, Col, Slider, InputNumber } from 'antd';
import { useState } from 'react';

const SearchAge = () => {
  const [inputValue, setInputValue] = useState([1, 100]);

  const onChange = (newValue: [number, number]): void => {
    console.log(newValue);
    setInputValue(newValue);
  };

  const onChange1 = (newValue: number | null): void => {
    console.log(newValue);
    if (newValue) setInputValue((inputValue) => [newValue, inputValue[1]]);
  };

  const onChange2 = (newValue: number | null): void => {
    console.log(newValue);
    if (newValue) setInputValue((inputValue) => [inputValue[0], newValue]);
  };

  return (
    <Row>
      <Col
        style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}
        span={4}
      >
        <InputNumber
          min={1}
          max={100}
          value={inputValue[0]}
          onChange={onChange1}
        />
      </Col>
      <Col span={16}>
        <Slider
          range
          defaultValue={[1, 100]}
          onChange={onChange}
          value={[inputValue[0], inputValue[1]]}
        />
      </Col>
      <Col
        style={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: '10px' }}
        span={4}
      >
        <InputNumber
          min={1}
          max={100}
          value={inputValue[1]}
          onChange={onChange2}
        />
      </Col>
    </Row>
  );
};

export default SearchAge;
