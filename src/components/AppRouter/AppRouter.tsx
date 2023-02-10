import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes, RouteNames } from '../../router';
import PostsFeed from '../posts-feed/Posts-feed';
import PrivateLayout from '../private-layout/Private-layout';

const AppRouter = () => {
  const isAuth = true; // TODO: should be replaced by getting from the global store

  return isAuth ? (
    <Routes>
      <Route
        path={RouteNames.Root}
        element={<PrivateLayout />}
      >
        {privateRoutes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        ))}
        <Route
          index
          element={<PostsFeed />}
        />
      </Route>
      <Route
        path='*'
        element={
          <Navigate
            replace
            to={RouteNames.Root}
          />
        }
      />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          element={<route.component />}
          key={route.path}
        />
      ))}
      <Route
        path='*'
        element={
          <Navigate
            replace
            to={RouteNames.Login}
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
