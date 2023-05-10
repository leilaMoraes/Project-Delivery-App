import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import requests from '../services/requests';
import Button from './Button';

export default function TableHeader({ order }) {
  const { role, token } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const { id, sellerId, saleDate, status } = order;
  const seller = sellers.find((sell) => sell.id === sellerId);
  const sellerName = seller?.name;

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

  // useEffect(() => {
  //   const getAllSales = async () => {
  //     const salesList = await getSales();
  //     setSales(salesList);
  //   };
  //   getAllSales();
  // }, []);

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

  return (
    <div>
      <span>
        ORDER
        {' '}
        {id}
      </span>
      {role === 'customer' && (
        <span>
          Seller:
          {' '}
          {sellerName}
        </span>
      )}
      <span>
        {date}
      </span>
      <div
        className={ `flex ${getColor()} rounded-lg items-center
        font-bold text-lg justify-center w-[150px] my-2` }
      >
        <span
          className="text-center"
        >
          {status.toUpperCase()}
        </span>
      </div>
      <Button />
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
