import { Row, Col } from 'antd';
import image from '../../../assets/images/no_users_found.svg';

const NoUsersFound = () => {
  return (
    <Row>
      <Row style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Col style={{ width: '100px', height: '100px' }}>
          <img
            style={{ width: '100%' }}
            src={image}
            alt='no usesr found'
          />
        </Col>
      </Row>
      <Row style={{ fontSize: '20px', margin: '10px auto' }}>No Users Found</Row>
    </Row>
  );
};

export default NoUsersFound;
