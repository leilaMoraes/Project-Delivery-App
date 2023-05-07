import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

export default function CheckoutTable() {
  const { cart, removeFromCart } = useContext(AppContext);
  // IF COMING BACK TO PRODUCTS PAGE THE INPUT NUMBERS ARE NOT UPDATED
  useEffect(() => {}, [cart]);

  return (
    <table style={ { width: '100%', border: '1px solid black', textAlign: 'center' } }>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Sub-total</th>
          <th>Remove Item</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(cart).map(([id, { name, price, quantity }], i) => (
          <tr key={ id }>
            <td
              data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
            >
              {i + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${i}` }
            >
              {name}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
            >
              {quantity}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
            >
              R$
              {' '}
              {price.toFixed(2).replace('.', ',')}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
            >
              R$
              {' '}
              {(price * quantity).toFixed(2).replace('.', ',')}
            </td>
            <td>
              <button
                type="button"
                data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                onClick={ () => removeFromCart(id) }
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
