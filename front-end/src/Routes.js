import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route path="/admin/manage" component={ Admin } />
    </Switch>
  );
}
