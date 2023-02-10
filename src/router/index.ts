import PostsFeed from '../components/posts-feed/Posts-feed';
import LoginPage from '../pages/login-page/Login-page';
import RegistrationPage from '../pages/registration-page/Registration-page';

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum RouteNames {
  Root = '/',
  Login = '/login',
  Registration = '/registration',
  Posts = '/posts',
  Settings = '/settings',
  Followers = '/followers',
  Following = '/following',
  Messages = '/messages',
  Users = '/users/:id',
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.Login, component: LoginPage },
  { path: RouteNames.Registration, component: RegistrationPage },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.Posts, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Settings, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Followers, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Following, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Messages, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Users, component: PostsFeed }, // TODO: should be replaced component
];
