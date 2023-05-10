// Generate a empty OrderDetails component
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import TableHeader from '../components/TableHeader';
import Header from '../components/Header';
import Table from '../components/Table';

export default function OrderDetails() {
  const table = ['Item', 'Description', 'Quantity', 'Unit Price', 'Sub-Total'];

  const { sales } = useContext(AppContext);
  const { id } = useParams();

  const order = sales.find((sale) => sale.id === Number(id));

  return (
    <div>
      <Header />
      <div className="mt-12">
        <TableHeader order={ order } />
        <Table
          tableH={ table }
          tableB={ order.products }
          screen="order_details"
        />
      </div>
    </div>
  );
}
