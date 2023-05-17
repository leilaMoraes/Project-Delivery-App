import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import requests from '../services/requests';
import AppContext from '../context/AppContext';

export default function Products() {
  const { totalValue, token, cart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const headers = { headers: { authorization: token } };
      const response = await requests.getProducts(headers);
      setProducts(response.data);
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { }, [cart]);

  return (
    <div>
      <Header />
      <div
        className="mt-[52px] sm:mt-[68px] mx-3 md:px-9 mb-10 center gap-4
        justify-items-center
        grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        {products.map((product) => (
          <ProductCard
            key={ product.id }
            { ...product }
          />
        ))}
      </div>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        className="bg-green-dark rounded-md fixed bottom-0 right-0 m-4 px-4 py-2
        text-white font-medium text-lg"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ totalValue === 0 }
      >
        View Cart: R$
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
          className="font-extrabold text-white"
        >
          {totalValue.toFixed(2).replace('.', ',')}
        </span>
      </button>
    </div>
  );
}
