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
          maxHeight: 'calc(100vh - 112px)',
          // maxWidth: 800,
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
