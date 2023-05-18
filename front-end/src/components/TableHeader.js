/* eslint-disable sonarjs/no-duplicate-string */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import requests from '../services/requests';
import Button from './Button';

export default function TableHeader({ order }) {
  const { user, role, token } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const { id, sellerId, saleDate, status } = order;
  const [orderStatus, setOrderStatus] = useState(status);
  const seller = sellers.find((sell) => sell.id === sellerId);
  const sellerName = seller?.name;

  const magicNumber = 4;
  const newId = String(id).padStart(magicNumber, '0');
  const newDate = new Date(saleDate);
  const date = new Intl.DateTimeFormat('pt-BR').format(newDate);

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

  // REFACTOR TO CHECK STATUS ON BACKEND
  const handleStatus = async (newStatus) => {
    const headers = { headers: { authorization: token } };
    const response = await requests.patchStatus(id, newStatus, headers);
    // const response2 = await requests.getProducts(headers);
    console.log('status', response);
    console.log('response');
    return setOrderStatus(newStatus);
  };

  function getColor() {
    switch (orderStatus.toLowerCase()) {
    case 'pending':
      return 'bg-pending';
    case 'preparing':
      return 'bg-preparing';
    case 'delivered':
      return 'bg-delivered';
    case 'in transit':
      return 'bg-inTransit';
    default:
    }
  }

  return (
    <div
      className="flex justify-around py-1 gap-3 flex-wrap
    font-bold text-lg md:text-xl items-center "
    >
      <span
        data-testid={ user.role === 'customer'
          ? 'customer_order_details__element-order-details-label-order-id'
          : 'seller_order_details__element-order-details-label-order-id' }
        // className="my-auto"
      >
        {`ORDER ${newId}`}
      </span>
      {role === 'customer' && (
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
          // className="font-bold text-xl"
        >
          {`Seller: ${sellerName}`}
        </span>
      )}
      <span
        data-testid={ user.role === 'customer'
          ? 'customer_order_details__element-order-details-label-order-date'
          : 'seller_order_details__element-order-details-label-order-date' }
        // className="font-bold text-xl"

      >
        {date}
      </span>
      <div
        className={ `flex ${getColor()} rounded-lg items-center
        justify-center w-[150px] px-4 py-0.5` }
      >
        <span
          data-testid={ user.role === 'customer'
            ? `customer_order_details__element-order-details-label-delivery-status-${id}`
            : `seller_order_details__element-order-details-label-delivery-status-${id}` }
          className="text-center uppercase"
        >
          {orderStatus}
        </span>
      </div>
      {user.role === 'seller' && (
        <Button
          // btnClass="bg-green-light  text-white px-4 rounded-lg text-lg
          //   hover:bg-green-hover2 disabled:opacity-50 disabled:cursor-not-allowed"
          btnClass="bg-green-light px-4 rounded-lg
        text-lg font-medium text-white py-0.5
        disabled:opacity-80 disabled:cursor-not-allowed hover:bg-green-hover2 "
          dataName="seller_order_details__button-preparing-check"
          disabled={ orderStatus !== 'Pending' }
          btnName="START PREPARING"
          onClick={ () => handleStatus('Preparing') }
        />
      )}
      <Button
        btnClass="bg-green-dark px-4 rounded-lg
        text-lg font-medium text-white py-0.5
        disabled:opacity-80 disabled:cursor-not-allowed hover:bg-green-hover1 "
        dataName={ user.role === 'seller'
          ? 'seller_order_details__button-dispatch-check'
          : 'customer_order_details__button-delivery-check' }
        disabled={ user.role === 'seller'
          ? orderStatus !== 'Preparing' : orderStatus !== 'In Transit' }
        btnName={ user.role === 'seller' ? 'OUT FOR DELIVERY' : 'MARK AS RECEIVED' }
        onClick={ user.role === 'seller'
          ? () => handleStatus('In Transit') : () => handleStatus('Delivered') }
      />
    </div>
  );
}

TableHeader.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    sellerId: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
