import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import requests from '../services/requests';

export default function TableHeader({ order }) {
  const { role, sales, token } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const { id, sellerId, saleDate } = order;
  const seller = sellers.find((sell) => sell.id === sellerId);
  const sellerName = seller?.name;

  const newDate = new Date(saleDate);
  const date = new Intl.DateTimeFormat('pt-BR').format(newDate);

  console.log('seller', seller);
  console.log('sellers', sellers);

  console.log(order);

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
      <span
        // data-testid={ currentPath === orderSeller
        // ? `seller_orders__element-delivery-status-${id}`
        // : `customer_orders__element-delivery-status-${id}` }
        className="text-center"
      >
        {/* {sales[id].status.toUpperCase()} */}
      </span>
    </div>
  );
}

// generate proptypes
TableHeader.propTypes = {
  order: PropTypes.shape({
    sellerId: PropTypes.number,
  }).isRequired,
};
