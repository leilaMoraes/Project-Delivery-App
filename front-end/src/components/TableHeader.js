import React from 'react';
import AppContext from '../context/AppContext';

export default function TableHeader() {
  const { role, sales } = useContext(AppContext);

  // useEffect(() => {
  //   const getAllSales = async () => {
  //     const salesList = await getSales();
  //     setSales(salesList);
  //   };
  //   getAllSales();
  // }, []);

  return (
    <div>
      <span>ORDER</span>
      {role === 'customer' && (
        <span>Seller:SELLER NAME</span>
      )}
      <span>DATE</span>
      <span
        data-testid={ currentPath === orderSeller
          ? `seller_orders__element-delivery-status-${id}`
          : `customer_orders__element-delivery-status-${id}` }
        className="text-center"
      >
        {sales[id].status.toUpperCase()}
      </span>
    </div>
  );
}
