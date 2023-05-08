import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import isTokenValid from './utils/tokenValidation';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Seller from './pages/Seller';
import Customer from './pages/Customer';

export default function Routes() {
  const role = isTokenValid();
  return (
  // <Route exact path="/">
  //   <Redirect to="/login" />
  // </Route>
  // <Route path="/login" component={ Login } />
  // <Route path="/register" component={ Register } />
  // <Route path="/customer/products" component={ Products } />
  // <Route path="/customer/checkout" component={ Checkout } />
  // <Route path="/admin/manage" component={ Admin } />
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
          <Route path="/customer/checkout" component={ Checkout } />
          <Route path="/customer/orders" component={ Customer } />
          <Route path="/admin/manage" component={ Admin } />
          <Route path="/seller/orders" component={ Seller } />
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
          <Route path="/customer/checkout" component={ Checkout } />
          <Route path="/customer/orders" component={ Customer } />
          <Route path="/admin/manage" component={ Admin } />
          <Route path="/seller/orders" component={ Seller } />
          {/* <Route path="*"><Redirect to="/login" /></Route> */}
        </>
      )}

    </Switch>
  );
}
