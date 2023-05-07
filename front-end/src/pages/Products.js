import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import requests from '../services/requests';
import AppContext from '../context/AppContext';

export default function Products() {
  const { totalValue, token } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const headers = { headers: { authorization: token } };
      const response = await requests.getProducts(headers);
      setProducts(response.data);
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <div className="flex flex-wrap mt-12 place-content-center gap-4">
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
        text-white"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ totalValue === 0 }
      >
        View Cart: R$
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
          className="text-bold text-white font-bold"
        >
          {totalValue.toFixed(2).replace('.', ',')}
        </span>
      </button>
    </div>
  );
}
