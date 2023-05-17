/* eslint-disable sonarjs/no-duplicate-string */
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Button from './Button';

export default function Header() {
  const { user, setRole, setToken, setUser } = useContext(AppContext);
  const { name, role } = user;
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const actualPage = '/customer/products';
  const adminProducts = '/admin/products';
  const adminPage = '/admin/manage';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setRole('');
    setToken('');
    setUser({});
    navigate('/login');
  };
  const handleOrders = () => {
    switch (role) {
    case 'customer': return navigate('/customer/orders');
    case 'seller': return navigate('/seller/orders');
    case 'administrator': return navigate('/admin/manage');
    default:
    }
  };
  const handleBtnName = () => {
    switch (role) {
    case 'customer': return 'MY ORDERS';
    case 'seller': return 'ORDERS';
    case 'administrator': return 'USERS';
    default:
    }
  };
  return (
    <header
      className="bg-green-dark fixed top-0 left-0 w-full
      z-50 shadow-md flex justify-between items-center flex-row
      text-md sm:text-lg h-[40px] sm:h-[55px]"
    >
      <div className="h-full min-w-screen flex flex-row whitespace-nowrap">
        {role === 'customer' && (
          <Button
            btnClass={ `sm:px-8 px-2.5 py-2 h-full font-bold ${currentPath === actualPage
              ? 'text-black bg-green-light hover:bg-green-hover2'
              : 'text-white bg-green-dark hover:bg-green-hover1'}` }
            dataName="customer_products__element-navbar-link-products"
            btnName="PRODUCTS"
            onClick={ () => navigate(actualPage) }
          />
        )}
        <Button
          btnClass={ `sm:px-8 px-2.5 py-2 h-full font-bold ${currentPath
            === actualPage || currentPath !== adminPage
            ? 'text-white bg-green-dark hover:bg-green-hover1'
            : 'text-black bg-green-light hover:bg-green-hover2'}` }
          dataName="customer_products__element-navbar-link-orders"
          onClick={ handleOrders }
          btnName={ handleBtnName() }
        />
        {role === 'administrator' && (
          <Button
            btnClass={ `sm:px-8 px-2.5 py-2 h-full font-bold ${currentPath
              !== adminProducts
              ? 'text-white bg-green-dark hover:bg-green-hover1'
              : 'text-black bg-green-light hover:bg-green-hover2'}` }
            onClick={ () => navigate('/admin/products') }
            btnName="PRODUCTS"
          />
          // <button type="button" onClick={ () => navigate('/admin/products') }>
          //   PRODUCT MANAGEMENT
          // </button>
        )}

      </div>
      <div className=" h-full flex flex-row">

        {/* <Button
          btnClass="sm:px-8 px-2.5 text-white bg-blue-dark py-2 h-full flex flex-shrink
          hidden sm:block"
          dataName="customer_products__element-navbar-link-logout"
          btnName={ name }
        /> */}
        {/* <div
          className="sm:px-8 px-2.5 text-white bg-blue-dark py-2 h-full
          hidden sm:block my-auto text-center "
        >
          {name}
        </div> */}
        <p
          className="text-white bg-blue-dark px-6 py-3.5 h-full hidden sm:block
          break-normal "
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </p>

        <Button
          btnClass="sm:px-8 px-2.5 py-2 h-full text-white bg-blue-light
          hover:bg-blue-hoverLgOut "
          dataName="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
          btnName="Logout"
        />
      </div>
    </header>
  );
}
