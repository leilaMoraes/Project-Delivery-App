import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import requests from '../services/requests';
import AppContext from '../context/AppContext';

export default function Products() {
  const { totalValue, token } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const headers = { headers: { authorization: token } };
      const response = await requests.getProducts(headers);
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const ROUTE = 'customer_products';
  const CART = 'button-cart';
  const VALUE = 'checkout-bottom-value';

  localStorage.setItem('user', JSON.stringify({
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
  }));
  return (
    <div>
      <Header />
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard
            key={ product.id }
            { ...product }
          />
        ))}
      </div>
      <button type="button" data-testid={ `${ROUTE}__${CART}` }>
        View Cart: R$
        {' '}
        <span data-testid={ `${ROUTE}__${VALUE}` }>{totalValue.toFixed(2)}</span>
      </button>
    </div>
  );
}
