import PropTypes from 'prop-types';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import Button from './Button';

export default function CheckoutTable({ table, cartItems, screen }) {
  const { removeFromCart, user } = useContext(AppContext);
  const ELE1 = '__element-order-table-';

  return (
    <table className="mx-2">
      <thead>
        <tr>
          {table.map((items, i) => (
            <th
              className="p-2 text-sm font-normal"
              key={ i }
            >
              {items}
            </th>))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(cartItems).map(([id, { name, price, quantity }], i) => (
          <tr
            className="border-b border-b-4 border-white"
            key={ i }
          >
            <td
              className="bg-green-light text-center font-medium p-2"
              data-testid={ `${user.role}_${screen}${ELE1}item-number-${i}` }
            >
              {i + 1}
            </td>
            <td
              className="bg-bg0 pl-2 w-3/6"
              data-testid={ `${user.role}_${screen}${ELE1}name-${i}` }
            >
              {name}
            </td>
            <td
              className="bg-green-dark text-white text-center font-medium"
              data-testid={ `${user.role}_${screen}${ELE1}quantity-${i}` }
            >
              {quantity}
            </td>
            <td
              className="bg-blue-dark text-white text-center font-medium"
              data-testid={ `${user.role}_${screen}${ELE1}unit-price-${i}` }
            >
              R$
              {' '}
              {price.toFixed(2).replace('.', ',')}
            </td>
            <td
              className="bg-blue-light text-white text-center font-medium"
              data-testid={ `${user.role}_${screen}${ELE1}sub-total-${i}` }
            >
              R$
              {' '}
              {(price * quantity).toFixed(2).replace('.', ',')}
            </td>
            {screen === 'checkout'
              && (
                <td
                  className="bg-green-light text-white text-center font-medium
                hover:bg-green-hover2"
                >
                  <Button
                    btnClass="w-full text-xl"
                    dataName={ `customer_checkout__element-order-table-remove-${i}` }
                    onClick={ () => removeFromCart(id) }
                    btnName="Remove"
                  />
                </td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CheckoutTable.propTypes = {
  table: PropTypes.array,
  cartItems: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  }),
  userType: PropTypes.string,
  screen: PropTypes.string,
}.isRequired;
