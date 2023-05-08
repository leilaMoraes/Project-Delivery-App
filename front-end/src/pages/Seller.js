import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import SalesCard from '../components/SalesCard';
import AppContext from '../context/AppContext';
import requests from '../services/requests';

function Seller() {
  const { token, user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  useEffect(() => {
    const getSales = async () => {
      try {
        const headers = { headers: { authorization: token } };
        await requests.getSales(user.id, headers)
          .then(({ data }) => setSales(data))
          .finally(() => setLoading(false));
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
      <div className="flex flex-wrap mt-20 gap-4 px-4 mx-4 justify-evenly">
        {loading ? <p>Loading...</p>
          : (sales !== undefined && sales.map((sale) => (
            <SalesCard
              key={ sale.id }
              { ...sale }
            />
          )))}
      </div>
    </div>
  );
}

export default Seller;
