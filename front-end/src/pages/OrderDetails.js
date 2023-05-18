// Generate a empty OrderDetails component
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import TableHeader from '../components/TableHeader';
import Header from '../components/Header';
import Table from '../components/Table';
import TotalPrice from '../components/TotalPrice';
import Title from '../components/Title';
import LoadAnimation from '../components/LoadAnimation';
// import TableTotalPrice from '../components/TotalPrice';

export default function OrderDetails() {
  const table = ['Item', 'Description', 'Quantity', 'Unit Price', 'Sub-Total'];

  const { sales, user } = useContext(AppContext);
  const { id } = useParams();

  const order = sales.find((sale) => sale.id === Number(id));

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (order) {
      setLoading(false);
    }
  }, [order]);

  // const route = useRoutes();
  // console.log('ROUTE', route);
  // const { sale } = route.params;
  // console.log('sale', sale);

  console.log(order);
  return (
    <div>
      <Header />
      {loading ? <LoadAnimation /> : (
        <div className="mt-12 sm:mt-16 w-[95%] m-auto max-w-[1100px]">

          <Title name="Order Details" />
          <div
            className="border-border0 border-[1px] bg-tableBg w-full p-2
        shadow-lg drop-shadow-md min-h-[400px] md:min-h-[550px] flex flex-col "
          >
            <TableHeader order={ order } />
            <Table
              tableH={ table }
              tableB={ order.products }
              screen="order_details"
            />

            <TotalPrice
              testid={ `${user.role}` === 'customer' ? 'customer_order_details'
                : 'seller_order_details' }
              total={ order.totalPrice }
            />
          </div>
        </div>
      )}
    </div>
  );
}
