import { useContext } from 'react';
import { AuthContext } from '../store';

export const useUser = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useUser must be used within AuthContext');
  }

  return context;
};
