import { Layout } from 'antd';
import AppRouter from '../AppRouter/AppRouter';
import './app.css';

const { Header, Footer } = Layout;

function App() {
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
