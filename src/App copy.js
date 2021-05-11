import React, { useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
  const { userId, isToken, login, logOut } = useAuth();

  let routes;
  if (isToken) {
    routes = (
      <Switch>
        <Route exact path='/users' component={Users} />
        <Route exact path='/:userId/places' component={UserPlaces} />
        <Route exact path='/places/new' component={NewPlace} />
        <Route exact path='/places/:placeId' component={UpdatePlace} />
        <Redirect to='/users' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/users' component={Users} />
        <Route exact path='/auth' component={Auth} />
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!isToken,
        isToken: isToken,
        userId: userId,
        login: login,
        logout: logOut,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
