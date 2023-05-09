import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function TotalPrice(props) {
  const { totalValue } = useContext(AppContext);
  const { testid } = props;
  const newValue = `Total: ${totalValue
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;

  return (
    <div className="flex justify-end m-2">
      <span
        className="bg-green-dark text-white text-3xl text-center font-medium rounded px-4"
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
