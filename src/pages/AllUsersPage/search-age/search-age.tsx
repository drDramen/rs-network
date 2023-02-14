/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import { Row, Col, Slider, InputNumber } from 'antd';
import { useState, useEffect } from 'react';

const SearchAge = ({
  setFiltredAge,
}: {
  setFiltredAge: React.Dispatch<React.SetStateAction<[number, number]>>;
}) => {
  const [inputValue, setInputValue] = useState<[number, number]>([0, 120]);

  useEffect(() => {
    setFiltredAge(inputValue);
  }, [inputValue]);

  const onChange = (newValue: [number, number]): void => {
    setInputValue(newValue);
  };

  const onChange1 = (newValue: number | null): void => {
    if (newValue) setInputValue((inputValue) => [newValue, inputValue[1]]);
  };

  const onChange2 = (newValue: number | null): void => {
    if (newValue) setInputValue((inputValue) => [inputValue[0], newValue]);
  };

  return (
    <Row>
      <Col
        style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}
        span={4}
      >
        <InputNumber
          min={0}
          max={120}
          value={inputValue[0]}
          onChange={onChange1}
        />
      </Col>
      <Col span={16}>
        <Slider
          range
          defaultValue={[0, 120]}
          min={0}
          max={120}
          onChange={onChange}
          value={[inputValue[0], inputValue[1]]}
        />
      </Col>
      <Col
        style={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: '10px' }}
        span={4}
      >
        <InputNumber
          min={0}
          max={120}
          value={inputValue[1]}
          onChange={onChange2}
        />
      </Col>
    </Row>
  );
};

export default SearchAge;
