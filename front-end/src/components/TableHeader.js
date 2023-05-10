import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import requests from '../services/requests';
import Button from './Button';

export default function TableHeader({ order }) {
  const { user, role, token } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const { id, sellerId, saleDate, status } = order;
  const seller = sellers.find((sell) => sell.id === sellerId);
  const sellerName = seller?.name;

  const magicNumber = 4;
  const newId = String(id).padStart(magicNumber, '0');
  const newDate = new Date(saleDate);
  const date = new Intl.DateTimeFormat('pt-BR').format(newDate);

  function getColor() {
    switch (status.toLowerCase()) {
    case 'pendente':
      return 'bg-pending';
    case 'entregue':
      return 'bg-delivered';
    case 'preparando':
      return 'bg-preparing';
    default:
    }
  }

  // REFACTOR FETCHES TO USE CONTEXT
  useEffect(() => {
    async function fetchSellers() {
      const headers = { headers: { authorization: token } };
      const response = await requests.getSellers(headers);
      setSellers(response.data);
    }
    fetchSellers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(user.role);

  return (
    <div className="flex justify-around">
      <span
        data-testid={ user.role === 'customer'
          ? 'customer_order_details__element-order-details-label-order-id'
          : 'seller_order_details__element-order-details-label-order-id' }
      >
        {`ORDER ${newId}`}
      </span>
      {role === 'customer' && (
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {`Seller: ${sellerName}`}
        </span>
      )}
      <span
        data-testid={ user.role === 'customer'
          ? 'customer_order_details__element-order-details-label-order-date'
          : 'seller_order_details__element-order-details-label-order-date' }
      >
        {date}
      </span>
      <div
        className={ `flex ${getColor()} rounded-lg items-center
        font-bold text-lg justify-center w-[150px] py-2 px-4` }
      >
        <span
          data-testid={ user.role === 'customer'
            ? `customer_order_details__element-order-details-label-delivery-status-${id}`
            : `seller_order_details__element-order-details-label-delivery-status-${id}` }
          className="text-center"
        >
          {status}
        </span>
      </div>
      {user.role === 'seller' && (
        <Button
          btnClass="bg-green-light hover:bg-green-hover2 text-white py-2 px-4
          rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          dataName="seller_order_details__button-preparing-check"
          disabled={ status !== 'Pendente' }
          btnName="PREPARAR PEDIDO"
        />
      )}
      <Button
        btnClass="bg-green-dark hover:bg-green-hover1 text-white py-2 px-4
        rounded-lg text-lg disabled:opacity-80 disabled:cursor-not-allowed"
        dataName={ user.role === 'seller'
          ? 'seller_order_details__button-dispatch-check'
          : 'customer_order_details__button-delivery-check' }
        disabled={ status !== 'Preparando' }
        btnName={ user.role === 'seller' ? 'SAIU PARA ENTREGA' : 'MARCAR COMO ENTREGUE' }
      />
    </div>
  );
}

// generate proptypes
TableHeader.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    sellerId: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
