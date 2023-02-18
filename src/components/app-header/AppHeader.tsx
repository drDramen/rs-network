import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useUser } from '../../hooks/useUser';
import { RouteNames } from '../../router';
import { Breakpoint } from '../../types/media';
import logo from '../../assets/images/logo_rs.png';
import Avatar from '../avatar';
import './app-header.css';

const AppHeader = () => {
  const { isAuth, user, logOut } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isNotMobile = useMediaQuery(Breakpoint.ESM);
  const isNotBurger = useMediaQuery(Breakpoint.MD);

  return (
    <Header
      style={{
        paddingInlineEnd: `${isNotMobile ? '50' : '10'}px`,
        paddingInlineStart: `${isNotBurger ? '30' : '40'}px`,
      }}
    >
      <Row align='middle'>
        <div className='logo-wrapper'>
          <img
            className='logo-img'
            src={logo}
            alt='rs-network-logo'
          />
          NETWORK
        </div>
        <div className='navbar'>
          {isAuth ? (
            <>
              <Avatar
                id={user._id}
                image={user.image}
                name={user.name}
              />
              <Button
                type='primary'
                icon={<LogoutOutlined />}
                size='small'
                onClick={logOut}
              >
                {isNotMobile ? 'Logout' : ''}
              </Button>
            </>
          ) : pathname === RouteNames.Login ? null : (
            <Button
              type='primary'
              className='login-btn'
              icon={<LoginOutlined />}
              size='small'
              onClick={() => navigate(RouteNames.Login)}
            >
              {isNotMobile ? 'Login' : ''}
            </Button>
          )}
        </div>
      </Row>
    </Header>
  );
};

export default AppHeader;
