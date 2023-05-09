// Generate a empty OrderDetails component
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import TableHeader from '../components/TableHeader';
import CheckoutTable from '../components/CheckoutTable';

export default function OrderDetails() {
  const { role, getSales, sales, setSales, token } = useContext(AppContext);
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  // IMPLEMENT LOADING
  useEffect(() => {
    // const getAllSales = async () => {
    //   const headers = { headers: { authorization: token } };
    //   const salesList = await getSales(role, 1, headers);
    //   setSales(salesList);
    //   console.log(salesList);
    // };
    // getAllSales();
    getSales();
    console.log(sales);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>OrderDetails</h1>
      <TableHeader />
      {/* <CheckoutTable cartItems={ sales.id } userType={ role } /> */}

    </div>
  );
}
