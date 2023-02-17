/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import { apiService } from '../services/api-service';
import { TypeUser } from '../types/types';
import { AuthActionName, initialState, UserMethods, userReducer, UserState } from './user-reducer';

export type IAuthContext = UserState & UserMethods;

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: AuthActionName.SET_LOADING, payload: isLoading });
  };

  const auth = async () => {
    const tokenFromStorage = localStorage.getItem('JWT');
    if (tokenFromStorage) {
      const response = await apiService.checkPermission(tokenFromStorage);
      if (response.status === 401 || response.status === 403) {
        dispatch({ type: AuthActionName.LOGOUT, payload: {} });
      }
      if (response.status === 200) {
        const user = (await response.json()) as TypeUser;
        dispatch({ type: AuthActionName.SET_USER, payload: user });
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    auth()
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const { user, token } = await apiService.login(email, password);
    localStorage.setItem('JWT', token);
    dispatch({ type: AuthActionName.SET_USER, payload: user });
  };

  const logOut = () => {
    dispatch({ type: AuthActionName.LOGOUT, payload: {} });
  };

  const updateUser = async (user: TypeUser) => {
    const updatedUser = await apiService.updateUser(user);
    dispatch({ type: AuthActionName.SET_USER, payload: updatedUser });
  };

  const value = {
    user: state.user,
    isAuth: state.isAuth,
    isLoading: state.isLoading,
    login,
    logOut,
    updateUser,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
