// Generate a empty OrderDetails component
import React from 'react';
import AppContext from '../context/AppContext';
import TableHeader from '../components/TableHeader';
import CheckoutTable from '../components/CheckoutTable';

export default function OrderDetails() {
  const { role, getSales, sales } = useContext(AppContext);

  // IMPLEMENT LOADING
  useEffect(() => {
    const getAllSales = async () => {
      const salesList = await getSales();
      setSales(salesList);
    };
    getAllSales();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>OrderDetails</h1>
      <TableHeader />
      <CheckoutTable cartItems={ sales.id } userType={ role } />

    </div>
  );
}
