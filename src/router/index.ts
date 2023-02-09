import PostsFeed from '../components/posts-feed/Posts-feed';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

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
  { path: RouteNames.Registration, component: RegisterPage },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.Posts, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Settings, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Followers, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Following, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Messages, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Users, component: PostsFeed }, // TODO: should be replaced component
];
