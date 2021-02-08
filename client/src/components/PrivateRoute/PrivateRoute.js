import { Redirect, Route, useLocation } from 'react-router-dom';
// eslint-disable-next-line
import React, { Component } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Route
      exact
      render={() =>
        isLoggedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/userlogin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
