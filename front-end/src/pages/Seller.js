import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import OrdersCard from '../components/OrdersCard';
import AppContext from '../context/AppContext';
import LoadAnimation from '../components/LoadAnimation';

export default function Seller() {
  const { sales, getSales } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        await getSales();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />

      <div className="flex flex-wrap mt-20 mb-3 mx-4 gap-4 justify-evenly">
        {loading ? <LoadAnimation />
          : (sales !== undefined && sales.map((sale) => (
            <OrdersCard
              key={ sale.id }
              { ...sale }
            />
          )))}
      </div>
    </div>
  );
}
