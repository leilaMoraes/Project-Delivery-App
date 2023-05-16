import React from 'react';
import PropTypes from 'prop-types';
// import AppContext from '../context/AppContext';

export default function TotalPrice(props) {
  // const { totalValue } = useContext(AppContext);
  const { testid, total } = props;
  const newValue = `Total: ${total
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;

  // function getTotalValue(items) {
  //   let totalValue = 0;

  //   for (const item of items) {
  //     const itemTotal = item.price * item.quantity;
  //     totalValue += itemTotal;
  //   }

  //   return totalValue;
  // }

  return (
    <div className="flex justify-end pt-2">
      <span
        className="bg-green-dark rounded px-4 py-1
         text-white text-3xl text-center font-bold "
        data-testid={ `${testid}__element-order-total-price` }
      >
        {newValue}
      </span>
    </div>
  );
}

TotalPrice.propTypes = {
  testid: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
