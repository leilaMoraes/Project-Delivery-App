import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  useEffect(() => {}, []);

  // CART CONTEXT
  const [cart, setCart] = useState({});
  const addOneToCart = (productId) => {
    setCart((prevCart) => {
      const quantity = prevCart[productId] ? (prevCart[productId] + 1) : 1;
      return { ...prevCart, [productId]: quantity };
    });
  };
  const removeOneFromCart = (productId) => {
    setCart((prevCart) => {
      const quantity = prevCart[productId] ? (prevCart[productId] - 1) : 0;
      const newCart = { ...prevCart };
      if (quantity === 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = quantity;
      }
      return newCart;
    });
  };

  const values = useMemo(() => ({ cart, addOneToCart, removeOneFromCart }), [cart]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
