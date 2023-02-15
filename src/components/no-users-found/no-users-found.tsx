import { Row, Col } from 'antd';
import image from '../../assets/images/no_users_found.svg';

const NoUsersFound = ({ title }: { title?: string }) => {
  const size = title ? 'calc(50% - 150px)' : '50px';

  return (
    <Row>
      <Row style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Col style={{ width: '200px', height: '200px', marginTop: size }}>
          <img
            style={{ width: '100%' }}
            src={image}
            alt='no usesr found'
          />
        </Col>
      </Row>
      <Row style={{ fontSize: '30px', margin: '15px auto' }}>
        {title ? title : 'No Users Found'}
      </Row>
    </Row>
  );
};

export default NoUsersFound;
