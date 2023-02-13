import { EmptyUser, TypeUser } from '../types/types';

export type UserState = {
  isAuth: boolean;
  user: TypeUser | EmptyUser;
  isLoading: boolean;
};

export type UserMethods = {
  login: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  updateUser: (user: TypeUser) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
};

export enum AuthActionName {
  SET_USER = 'SET_USER',
  SET_LOADING = 'SET_LOADING',
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

export interface SetLoadingAction {
  type: AuthActionName.SET_LOADING;
  payload: boolean;
}

export type AuthAction = LogoutAction | SetUserAction | SetLoadingAction;

export const initialState: UserState = {
  isAuth: false,
  user: {},
  isLoading: true,
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
    case AuthActionName.SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
};
