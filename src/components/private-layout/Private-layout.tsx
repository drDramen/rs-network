import { Layout, Menu } from 'antd';
import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { items } from './menu-items';

const { Sider, Content } = Layout;

const PrivateLayout: FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
      >
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default PrivateLayout;
