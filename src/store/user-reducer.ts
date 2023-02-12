import { EmptyUser, TypeUser } from '../types/types';

export type UserState = {
  isAuth: boolean;
  user: TypeUser | EmptyUser;
};

export type UserMethods = {
  login: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  updateUser: (user: TypeUser) => Promise<void>;
};

export enum AuthActionName {
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
}

export interface LogoutAction {
  type: AuthActionName.LOGOUT;
  payload: EmptyUser;
}
export interface SetUserAction {
  type: AuthActionName.SET_USER;
  payload: TypeUser;
}

export type AuthAction = LogoutAction | SetUserAction;

export const initialState: UserState = {
  isAuth: false,
  user: {},
};

export const userReducer = (state: UserState, action: AuthAction): UserState => {
  const { type, payload } = action;

  switch (type) {
    case AuthActionName.LOGOUT:
      localStorage.removeItem('JWT');
      return {
        ...state,
        user: payload,
        isAuth: false,
      };
    case AuthActionName.SET_USER:
      return {
        ...state,
        user: payload,
        isAuth: true,
      };

    default:
      return state;
  }
};
