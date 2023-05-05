import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

// ADD PROPS FOR HEADER ELEMENTS
export default function Header() {
  const { user } = useContext(AppContext);
  const { name, role } = user;
  const history = useHistory();
  const ROUTE = 'customer_products';
  const PRODUCTS = 'element-navbar-link-products';
  const ORDERS = 'element-navbar-link-orders';
  const USER = 'element-navbar-user-full-name';
  const LOGOUT = 'element-navbar-link-logout';

  return (
    <header className="header">
      {/*
        botao de produtos só renderiza se o usuario for customer
        talvez passar os testids por props?
        duas divs left, uma para cada user type
      */}
      <div>
        {role === 'customer' && (
          <button
            data-testid={ `${ROUTE}__${PRODUCTS}` }
            type="button"
          >
            PRODUCTS
          </button>
        )}
        <button
          data-testid={ `${ROUTE}__${ORDERS}` }
          type="button"
          onClick={ () => history.push('/admin/manage') }
        >
          {role === 'administrator' ? 'USER MANAGEMENT' : 'ORDERS'}
        </button>

      </div>

      <div>
        <p
          style={ { backgroundColor: 'green', display: 'inline' } }
          data-testid={ `${ROUTE}__${USER}` }
        >
          {name}

        </p>

        <button
          data-testid={ `${ROUTE}__${LOGOUT}` }
          type="button"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
