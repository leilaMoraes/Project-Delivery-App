// Generate a empty OrderDetails component
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import TableHeader from '../components/TableHeader';
import Header from '../components/Header';
import Table from '../components/Table';
import TotalPrice from '../components/TotalPrice';
import Title from '../components/Title';

export default function OrderDetails() {
  const table = ['Item', 'Description', 'Quantity', 'Unit Price', 'Sub-Total'];

  const { sales, user } = useContext(AppContext);
  const { id } = useParams();

  const order = sales.find((sale) => sale.id === Number(id));

  return (
    <div>
      <Header />
      <div className="mt-12">
        <Title name="Order Detail" />
        <TableHeader order={ order } />
        <Table
          tableH={ table }
          tableB={ order.products }
          screen="order_details"
        />
        <TotalPrice
          testid={ `${user.role}` === 'customer' ? 'customer_order_details'
            : 'seller_order_details' }
        />
      </div>
    </div>
  );
}
