import { Layout } from 'antd';
import { useUser } from '../../hooks/useUser';
import AppHeader from '../app-header/AppHeader';
import AppRouter from '../AppRouter/AppRouter';
import LoadSpinner from '../load-spinner/LoadSpinner';
import './app.css';

function App() {
  const { isLoading } = useUser();

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <div className='app'>
      <Layout className='app-container'>
        <AppHeader />
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
