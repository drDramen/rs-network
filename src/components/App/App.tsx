import { Layout, Row, Spin } from 'antd';
import { useUser } from '../../hooks/useUser';
import AppHeader from '../app-header/AppHeader';
import AppRouter from '../AppRouter/AppRouter';
import './app.css';
import './variables.css';

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
        <AppHeader />
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
