import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

// ADD PROPS FOR HEADER ELEMENTS
export default function Header() {
  const { user } = useContext(AppContext);
  const { name, role } = user;
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const ROUTE = 'customer_products';
  const PRODUCTS = 'element-navbar-link-products';
  const ORDERS = 'element-navbar-link-orders';
  const USER = 'element-navbar-user-full-name';
  const LOGOUT = 'element-navbar-link-logout';

  return (
    <header
      // className="header"
      className="fixed top-0 left-0 w-full bg-green-dark
      z-50 shadow-md flex justify-between items-center"
    >
      <div>
        {role === 'customer' && (
          <button
            data-testid={ `${ROUTE}__${PRODUCTS}` }
            className="text-white bg-green-light px-4 py-2 h-full"
            type="button"
            onClick={ () => history.push('/customer/products') }
          >
            PRODUCTS
          </button>
        )}
        <button
          data-testid={ `${ROUTE}__${ORDERS}` }
          className="text-white px-4 py-2 h-full"
          type="button"
          onClick={ () => history.push('/admin/manage') }
        >
          {role === 'administrator' ? 'USER MANAGEMENT' : 'ORDERS'}
        </button>

      </div>

      <div>
        <p
          className="text-white bg-blue-dark px-4 py-2 h-full inline-block"
          // style={ { backgroundColor: 'green', display: 'inline' } }
          data-testid={ `${ROUTE}__${USER}` }
        >
          {name}
        </p>

        <button
          data-testid={ `${ROUTE}__${LOGOUT}` }
          className="text-white bg-blue-light px-4 py-2 h-full"
          onClick={ handleLogout }
          type="button"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
