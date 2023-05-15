import PropTypes from 'prop-types';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import Button from './Button';

export default function Table({ tableH, tableB, screen }) {
  const { removeFromCart, user, deleteUser } = useContext(AppContext);
  const ELE1 = '__element-order-table-';

  return (
    // CHECK WIDTH TABLE
    <table
      className="table-auto border-separate border-spacing-y-1.5
      w-full"
    >
      <thead className="mx-2">
        <tr>
          {tableH.map((items, i) => (
            <th
              className="text-sm font-normal"
              key={ i }
            >
              {items}
            </th>))}
        </tr>
      </thead>
      <tbody className="m-[100px]">
        { screen === 'admin_manage' ? (
          tableB.map(({ id, name, email, role }, index) => (
            <tr
              className="border"
              key={ id }
            >
              <td
                className="bg-green-light text-center font-medium p-2
                  rounded-l-lg w-[60px]"
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                className="bg-bg0 pl-2 w-auto"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {name}
              </td>
              <td
                className="bg-green-dark text-white text-center font-medium w-1/3"
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {email}
              </td>
              <td
                className="bg-blue-dark text-white text-center font-medium capitalize"
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {role}
              </td>
              <td
                className="bg-blue-light text-white text-center font-medium
                hover:bg-blue-hoverLgOut rounded-r-lg"
              >
                <Button
                  btnClass="w-full text-xl"
                  dataName={ `admin_manage__element-user-table-remove-${index}` }
                  onClick={ () => deleteUser(id) }
                  btnName="Delete"
                />
              </td>
            </tr>
          ))) : (
          Object.entries(tableB).map(([id, { name, price, quantity }], i) => (
            <tr key={ i }>
              <td
                className="bg-green-light text-center font-medium p-2
                rounded-l-lg w-[60px]"
                data-testid={ `${user.role}_${screen}${ELE1}item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                className="bg-bg0 pl-2 w-auto"
                data-testid={ `${user.role}_${screen}${ELE1}name-${i}` }
              >
                {name}
              </td>
              <td
                className="bg-green-dark text-white text-center font-medium w-[80px]"
                data-testid={ `${user.role}_${screen}${ELE1}quantity-${i}` }
              >
                {quantity}
              </td>
              <td
                className="bg-blue-dark text-white text-center font-medium w-[100px]"
                data-testid={ `${user.role}_${screen}${ELE1}unit-price-${i}` }
              >
                R$
                {' '}
                {price.toFixed(2).replace('.', ',')}
              </td>
              <td
                // className="bg-blue-light text-white text-center font-medium"
                data-testid={ `${user.role}_${screen}${ELE1}sub-total-${i}` }
                className={ `bg-blue-light text-white text-center font-medium w-[100px]
                ${screen === 'order_details' && 'rounded-r-lg'}` }
              >
                R$
                {' '}
                {(price * quantity).toFixed(2).replace('.', ',')}
              </td>
              {screen === 'checkout'
              && (
                <td
                  className="bg-green-light text-white text-center font-medium
                hover:bg-green-hover2 rounded-r-lg"
                >
                  <Button
                    btnClass="w-full text-xl"
                    dataName={ `customer_checkout__element-order-table-remove-${i}` }
                    onClick={ () => removeFromCart(id) }
                    btnName="Remove"
                  />
                </td>)}
            </tr>
          )))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  tableH: PropTypes.array,
  tableB: PropTypes.shape({}),
  screen: PropTypes.string,
}.isRequired;
