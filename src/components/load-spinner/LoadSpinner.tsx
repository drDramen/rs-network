import { Spin } from 'antd';
import './load-spinner.css';

function LoadSpinner() {
  return (
    <div className='loading'>
      <Spin size='large' />
    </div>
  );
}

export default LoadSpinner;
