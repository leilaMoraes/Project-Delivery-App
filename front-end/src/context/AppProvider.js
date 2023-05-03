import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  useEffect(() => {}, []);

  // CART CONTEXT
  const [cart, setCart] = useState({});
  const [totalValue, setTotalValue] = useState(0);
  const addOneToCart = (productId, price) => {
    setCart((prevCart) => {
      const quantity = prevCart[productId] ? (prevCart[productId] + 1) : 1;
      return { ...prevCart, [productId]: quantity };
    });
    setTotalValue(totalValue + price);
  };
  const removeOneFromCart = (productId, price) => {
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
    setTotalValue(totalValue - price);
  };

  const values = useMemo(() => ({
    cart, setCart, addOneToCart, removeOneFromCart, totalValue,
  }), [cart, totalValue]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
