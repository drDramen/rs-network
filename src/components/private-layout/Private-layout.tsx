import { Layout, Menu, Row } from 'antd';
import Footer from '../footer';
import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { getMenuItems } from './menu-items';
import './private-layout.css';

const { Sider, Content } = Layout;

const PrivateLayout: FC = () => {
  const location = useLocation();
  const { user } = useUser();
  const items = getMenuItems(user._id);

  return (
    <Layout>
      <Sider
        breakpoint='md'
        collapsedWidth='0'
      >
        <Row
          style={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[location.pathname]}
            items={items}
          />
          <Footer />
        </Row>
      </Sider>
      <Content
        style={{
          maxHeight: 'calc(100vh - 64px)',
          margin: 'auto',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default PrivateLayout;
