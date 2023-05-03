import React from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  const { username } = props;
  const ROUTE = 'customer_products';
  const PRODUCTS = 'element-navbar-link-products';
  const ORDERS = 'element-navbar-link-orders';
  const USER = 'element-navbar-user-full-name';
  const LOGOUT = 'element-navbar-link-logout';
  const USERTYPE = 'CUSTOMER';

  return (
    <header>
      {/*
        botao de produtos só renderiza se o usuario for customer
        talvez passar os testids por props?
        duas divs left, uma para cada user type
      */}
      <div>
        {USERTYPE === 'CUSTOMER' && (
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
        >
          {USERTYPE === 'CUSTOMER' ? 'MY ORDERS' : 'ORDERS'}
        </button>
      </div>

      <div>
        <button
          data-testid={ `${ROUTE}__${USER}` }
          type="button"
        >
          {username}
        </button>
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

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
