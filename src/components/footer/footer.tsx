import { Row, Col, Tooltip } from 'antd';
import logoGithub from '../../assets/images/logo_github.svg';
import logoRsschool from '../../assets/images/logo_rsschool.svg';
import './footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <Row>
        <Col
          className='rsschool-logo'
          span={24}
        >
          <a href='https://rs.school/js/'>
            <img
              style={{ width: '100%' }}
              src={logoRsschool}
              alt='rsschool-logo'
            />
          </a>
        </Col>
      </Row>
      <Row>
        <Col
          className='year'
          span={24}
        >
          <span>2</span>
          <span>0</span>
          <span>2</span>
          <span>3</span>
        </Col>
      </Row>
      <Row className='github-wrapper'>
        <Col
          className='github-logo'
          span={8}
          style={{ margin: 'auto' }}
        >
          <Tooltip
            placement='topLeft'
            color={'#2db7f5'}
            title={'polyand'}
          >
            <a href='https://github.com/polyand'>
              <img
                src={logoGithub}
                alt='github-logo'
              />
            </a>
          </Tooltip>
        </Col>
        <Col
          className='github-logo'
          span={8}
        >
          <Tooltip
            placement='top'
            color={'#2db7f5'}
            title={'AleksandrYermolaev'}
          >
            <a href='https://github.com/AleksandrYermolaev'>
              <img
                src={logoGithub}
                alt='github-logo'
              />
            </a>
          </Tooltip>
        </Col>
        <Col
          className='github-logo'
          span={8}
        >
          <Tooltip
            placement='topRight'
            color={'#2db7f5'}
            title={'drDramen'}
          >
            <a href='https://github.com/drDramen'>
              <img
                src={logoGithub}
                alt='github-logo'
              />
            </a>
          </Tooltip>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
