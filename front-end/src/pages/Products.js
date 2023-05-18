import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIo from 'socket.io-client';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import requests from '../services/requests';
import AppContext from '../context/AppContext';
import LoadAnimation from '../components/LoadAnimation';

export default function Products() {
  const { totalValue, token, cart, toBRL } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });
    socket.on('products@new', (product) => {
      setProducts((prevState) => prevState.concat(product));
    });
    socket.on('products@delete', (productName) => {
      setProducts((prevState) => prevState.filter((item) => item.name !== productName));
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const headers = { headers: { authorization: token } };
      const response = await requests.getProducts(headers);
      setProducts(response.data);
      setLoading(false);
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { }, [cart]);

  return (
    <div>
      <Header />
      {loading ? <LoadAnimation /> : (
        <div
          className="mt-[52px] sm:mt-[68px] mx-3 mb-10 md:px-9 center gap-4
        justify-items-center
        grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        >
          {products.map((product) => (
            <ProductCard
              key={ product.id }
              { ...product }
            />
          ))}
          <button
            type="button"
            data-testid="customer_products__button-cart"
            className="bg-green-dark rounded-md fixed bottom-0 right-0 m-4 px-4 py-2
        text-white font-medium text-lg"
            onClick={ () => navigate('/customer/checkout') }
            disabled={ totalValue === 0 }
          >
            View Cart:
            {' '}
            <span
              data-testid="customer_products__checkout-bottom-value"
              className="font-extrabold text-white"
            >
              {/* {totalValue.toFixed(2).replace('.', ',')} */}
              {toBRL(totalValue) }
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
