import PostsFeed from '../components/posts-feed/Posts-feed';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import UserPage from '../pages/UserPage/UserPage';
import AllUsersPage from '../pages/AllUsersPage/AllUsersPage';
import FollowingPage from '../pages/FollowingPage/FollowingPage';
import FollowersPage from '../pages/FollowersPage/FollowersPage';

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
  AllUsers = '/users',
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
  { path: RouteNames.Settings, component: SettingsPage }, // TODO: should be replaced component
  { path: RouteNames.AllUsers, component: AllUsersPage }, // TODO: should be replaced component
  { path: RouteNames.Followers, component: FollowingPage }, // TODO: should be replaced component
  { path: RouteNames.Following, component: FollowersPage }, // TODO: should be replaced component
  { path: RouteNames.Messages, component: PostsFeed }, // TODO: should be replaced component
  { path: RouteNames.Users, component: UserPage }, // TODO: should be replaced component
];
