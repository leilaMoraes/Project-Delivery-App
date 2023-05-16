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
    case 'administrator': return 'USER MANAGEMENT';
    default:
    }
  };
  return (
    <header
      className="bg-green-dark fixed top-0 left-0 w-full
      z-50 shadow-md flex justify-between items-center flex-row
      sm:text-sm md:text-lg sm:h-[40px] md:h-[55px]"
    >
      <div className="h-full min-w-screen flex flex-row whitespace-nowrap">
        {role === 'customer' && (
          <Button
            btnClass={ `md:px-8 px-2.5 py-2 h-full font-bold ${currentPath === actualPage
              ? 'text-black bg-green-light hover:bg-green-hover2'
              : 'text-white bg-green-dark hover:bg-green-hover1'}` }
            dataName="customer_products__element-navbar-link-products"
            btnName="PRODUCTS"
            onClick={ () => navigate(actualPage) }
          />
        )}
        <Button
          btnClass={ `md:px-8 px-2.5 py-2 h-full font-bold ${currentPath === actualPage
            ? 'text-white bg-green-dark hover:bg-green-hover1'
            : 'text-black bg-green-light hover:bg-green-hover2'}` }
          dataName="customer_products__element-navbar-link-orders"
          onClick={ handleOrders }
          btnName={ handleBtnName() }
        />
      </div>
      <div className=" h-full flex whitespace-nowrap text-clip">
        {}
        <Button
          btnClass="md:px-8 px-2.5 text-white bg-blue-dark py-2 h-full flex flex-shrink
          hidden md:block"
          dataName="customer_products__element-navbar-link-logout"
          btnName={ name }
        />
        <Button
          btnClass="md:px-8 px-2.5 py-2 h-full text-white bg-blue-light
          hover:bg-blue-hoverLgOut "
          dataName="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
          btnName="Logout"
        />
      </div>
    </header>
  );
}
