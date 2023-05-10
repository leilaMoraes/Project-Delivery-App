import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import AppContext from './AppContext';
import requests from '../services/requests';

export default function AppProvider({ children }) {
  // CART CONTEXT
  const storedCart = localStorage.getItem('cart');
  const initialCart = storedCart ? JSON.parse(storedCart) : {};
  const [cart, setCart] = useState(initialCart);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || '');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Compute the new total value based on the current contents of the cart
    const newTotalValue = Object.values(cart)
      .reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    setTotalValue(newTotalValue);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const addToCart = (id, name, price, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: {
        name,
        price,
        quantity,
      },
    }));
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[id];
      return newCart;
    });
  };

  const deleteUser = async (id) => {
    try {
      const headers = { headers: { authorization: token } };
      await requests.deleteUser(id, headers);
      setUsers(users.filter((u) => u.id !== id));
      toast.success('User deleted successfully');
      setMessage('User deleted successfully');
    } catch (error) {
      setMessage(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const values = useMemo(() => ({
    cart,
    setCart,
    addToCart,
    removeFromCart,
    totalValue,
    user,
    setUser,
    message,
    setMessage,
    token,
    setToken,
    users,
    setUsers,
    deleteUser,
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
