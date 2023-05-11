import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function TotalPrice(props) {
  const { totalValue } = useContext(AppContext);
  const { testid } = props;
  const newValue = `Total: ${totalValue
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;

  return (
    <div className="flex justify-end">
      <span
        className="bg-green-dark rounded px-4 py-1
         text-white text-3xl text-center font-medium"
        data-testid={ `${testid}__element-order-total-price` }
      >
        {newValue}
      </span>
    </div>
  );
}

TotalPrice.propTypes = {
  testid: PropTypes.string.isRequired,
};

export default TotalPrice;
