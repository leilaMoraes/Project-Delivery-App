import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import OrdersCard from '../components/OrdersCard';
import AppContext from '../context/AppContext';
import requests from '../services/requests';
import LoadAnimation from '../components/LoadAnimation';

function Seller() {
  const { token, user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      try {
        const headers = { headers: { authorization: token } };
        const response = await requests.salesSeller(user.id, headers);
        if (response && response.data) {
          setSales(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />

      <div className="flex flex-wrap mt-20 gap-4 mx-4 justify-evenly">
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

export default Seller;
