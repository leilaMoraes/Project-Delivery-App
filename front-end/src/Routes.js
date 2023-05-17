import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import jwt from 'jwt-decode';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Seller from './pages/Seller';
import Customer from './pages/Customer';
import OrderDetails from './pages/OrderDetails';
import AppContext from './context/AppContext';
import { getRoute } from './utils/tokenValidation';
import AdminProducts from './pages/AdminProducts';

export default function Router() {
  const { token, role, setRole } = useContext(AppContext);
  useEffect(() => {
    const THOUSAND = 1000;
    if (!token) return false;
    const decodedToken = jwt(token);
    if (Date.now() > decodedToken.exp * THOUSAND) return false;
    setRole(decodedToken.role);
  }, [token, setRole]);
  return (
    <Routes>
      {role ? (
        <>
          <Route exact path="/" element={ <Navigate to={ getRoute(role) } /> } />
          <Route path="/customer/products" element={ <Products /> } />
          <Route path="/customer/checkout" element={ <Checkout /> } />
          <Route exact path="/customer/orders" element={ <Customer /> } />
          <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
          <Route path="/admin/manage" element={ <Admin /> } />
          <Route path="/admin/products" element={ <AdminProducts /> } />
          <Route exact path="/seller/orders" element={ <Seller /> } />
          <Route path="/seller/orders/:id" element={ <OrderDetails /> } />
          <Route path="*" element={ <Navigate to={ getRoute(role) } /> } />
        </>
      ) : (
        <>
          <Route exact path="/" element={ <Navigate to="login" /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="*" element={ <Navigate to="/login" /> } />
        </>
      )}

    </Routes>
  );
}
