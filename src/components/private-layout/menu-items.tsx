import { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';

export const getMenuItems = (id: string): MenuProps['items'] => {
  return [
    {
      label: <NavLink to={'/users/' + id}>My Page</NavLink>,
      key: `/users/${id}`,
    },
    {
      label: <NavLink to={'/' + id}>Post feed</NavLink>,
      key: '/',
    },
    {
      label: <NavLink to='/users'>All Users</NavLink>,
      key: '/users',
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
};
