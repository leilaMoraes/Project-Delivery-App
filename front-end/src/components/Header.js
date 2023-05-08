import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Button from './Button';

export default function Header() {
  const { user } = useContext(AppContext);
  const { name, role } = user;
  const history = useHistory();
  const currentPath = history.location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    history.push('/login');
  };

  const handleOrders = () => {
    switch (role) {
    case 'customer': return history.push('/customer/orders');
    case 'seller': return history.push('/seller/orders');
    case 'administrator': return history.push('/admin/manage');
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
      className="fixed top-0 left-0 w-full bg-green-dark
      z-50 shadow-md flex justify-between items-center"
    >
      <div>
        {role === 'customer' && (
        //     <button
        //       data-testid={ `${ROUTE}__${PRODUCTS}` }
        //       className={ ` px-4 py-2 h-full
        //     ${currentPath === '/customer/products'
        //       ? 'text-black bg-green-light' : 'text-white bg-green-dark'}` }
        //       // className="text-white bg-green-light px-4 py-2 h-full"
        //       type="button"
        //       onClick={ () => history.push('/customer/products') }
        //     >
        //       PRODUCTS
        //     </button>
        //   )}
        //   <button
        //     data-testid={ `${ROUTE}__${ORDERS}` }
        //     className={ ` px-4 py-2 h-full
        //     ${currentPath === '/customer/orders' || currentPath === '/admin/manage'
        // ? 'text-black bg-green-light' : 'text-white bg-green-dark'}` }
        //     // className="text-white px-4 py-2 h-full"
        //     type="button"
        //     onClick={ () => history.push('/admin/manage') }
        //   >
        //     {role === 'administrator' ? 'USER MANAGEMENT' : 'ORDERS'}
        //   </button>

          <Button
            btnClass={ currentPath === '/customer/orders'
              ? 'text-white bg-green-dark px-4 py-2 h-full'
              : 'text-white bg-green-light px-4 py-2 h-full' }
            dataName="customer_products__element-navbar-link-products"
            btnName="PRODUCTS"
            onClick={ () => history.push('/customer/products') }
          />
        )}
        <Button
          btnClass={ currentPath === '/customer/products'
            ? 'text-white bg-green-dark px-4 py-2 h-full'
            : 'text-white bg-green-light px-4 py-2 h-full' }
          dataName="customer_products__element-navbar-link-orders"
          onClick={ handleOrders }
          btnName={ handleBtnName() }
        />
      </div>
      <div>
        <p
          className="text-white bg-blue-dark px-4 py-2 h-full inline-block"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </p>
        <Button
          btnClass="text-white bg-blue-light px-4 py-2 h-full"
          dataName="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
          btnName="Logout"
        />
      </div>
    </header>
  );
}
