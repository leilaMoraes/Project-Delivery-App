import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import isTokenValid from './utils/tokenValidation';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Admin from './pages/Admin';

export default function Routes() {
  const role = isTokenValid();
  return (
    <Switch>
      {role ? (
        <>
          <Route exact path="/">
            <Redirect to={ role } />
          </Route>
          <Route path="/login">
            <Redirect to={ role } />
          </Route>
          <Route path="/register"><Redirect to={ role } /></Route>
          <Route path="/customer/products" component={ Products } />
          <Route path="/admin/manage" component={ Admin } />
          <Route path="*"><Redirect to={ role } /></Route>
        </>
      ) : (
        <>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/customer/products" component={ Products } />
          <Route path="/admin/manage" component={ Admin } />
          <Route path="*"><Redirect to="/login" /></Route>
        </>
      )}

    </Switch>
  );
}
