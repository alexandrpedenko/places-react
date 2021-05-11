import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuth: isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth ? <Redirect to='/auth' /> : <Component {...props} />
    }
  />
);

export default PrivateRoute;
