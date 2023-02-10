import { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';

const id = 'ddddd'; // TODO: should be replaced by getting from the global store

export const items: MenuProps['items'] = [
  {
    label: <NavLink to={'/users/' + id}>My Page</NavLink>,
    key: `/users/${id}`,
  },
  {
    label: <NavLink to='/followers'>Followers</NavLink>,
    key: '/followers',
  },
  {
    label: <NavLink to='/following'>Following</NavLink>,
    key: '/following',
  },
  {
    label: <NavLink to='/messages'>Messages</NavLink>,
    key: '/messages',
  },
  {
    label: <NavLink to='/settings'>Settings</NavLink>,
    key: '/settings',
  },
];
