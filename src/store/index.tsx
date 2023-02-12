/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import { apiBaseUrl } from '../api-constants';
import { LoginResponse } from '../components/auth/LoginForm/LoginForm';
import ApiService from '../services/api-service';
import { TypeUser } from '../types/types';
import { AuthActionName, initialState, UserMethods, userReducer, UserState } from './user-reducer';

export type IAuthContext = UserState & UserMethods;

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const apiService = new ApiService();

  const auth = async () => {
    const tokenFromStorage = localStorage.getItem('JWT');
    if (tokenFromStorage) {
      const response = await fetch(`${apiBaseUrl}permission`, {
        headers: { Authorization: `Bearer ${tokenFromStorage}` },
      });

      const user = (await response.json()) as TypeUser;
      dispatch({ type: AuthActionName.SET_USER, payload: user });
    }
  };

  useEffect(() => {
    void (async () => {
      await auth();
    })();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 400) {
      const error = await response.text();
      throw new Error(`${error}`);
    }
    const { user, token } = (await response.json()) as LoginResponse;

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
    login,
    logOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
