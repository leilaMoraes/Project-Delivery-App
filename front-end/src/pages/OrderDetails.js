// Generate a empty OrderDetails component
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import TableHeader from '../components/TableHeader';
import CheckoutTable from '../components/CheckoutTable';
import Header from '../components/Header';

export default function OrderDetails() {
  const { role, sales } = useContext(AppContext);
  const { id } = useParams();

  console.log('sales', sales);
  const order = sales.find((sale) => sale.id === Number(id));

  // useEffect(() => {
  // }, []);

  // IMPLEMENT LOADING
  // useEffect(() => {
  //   // const getAllSales = async () => {
  //   //   const headers = { headers: { authorization: token } };
  //   //   const salesList = await getSales(role, 1, headers);
  //   //   setSales(salesList);
  //   //   console.log(salesList);
  //   // };
  //   // getAllSales();
  //   getSales();
  //   console.log(sales);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <Header />
      <div className="mt-12">
        <TableHeader order={ order } />
        <CheckoutTable cartItems={ order.products } userType={ role } />

      </div>
    </div>
  );
}
