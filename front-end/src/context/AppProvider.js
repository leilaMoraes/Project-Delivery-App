import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  // CART CONTEXT
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || '');
  const [cart, setCart] = useState({});
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    // Compute the new total value based on the current contents of the cart
    const newTotalValue = Object.values(cart)
      .reduce((acc, { price, quantity }) => acc + price * quantity, 0);

    setTotalValue(newTotalValue);
  }, [cart]);
  const addToCart = (id, price, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: {
        price,
        quantity,
      },
    }));
  };

  const values = useMemo(() => ({
    cart,
    setCart,
    addToCart,
    totalValue,
    user,
    setUser,
    message,
    setMessage,
    token,
    setToken,
    users,
    setUsers,
  }), [cart, totalValue, user, message, token, users]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
