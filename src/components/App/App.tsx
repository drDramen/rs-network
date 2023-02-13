import { Layout, Row, Spin } from 'antd';
import { useUser } from '../../hooks/useUser';
import AppRouter from '../AppRouter/AppRouter';
import './app.css';

const { Header } = Layout;

function App() {
  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <Row className='loading'>
        <Spin size='large' />
      </Row>
    );
  }

  return (
    <div className='App'>
      <Layout className='app-container'>
        <Header>
          <div className='logo'>RS Network</div>
        </Header>
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
