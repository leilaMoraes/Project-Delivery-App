import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { totalValue } = useContext(AppContext);
  const products = fetch('http://localhost:3001/products');

  const ROUTE = 'customer_products';
  const CART = 'button-cart';
  const VALUE = 'checkout-bottom-value';

  return (
    <div>
      <Header />
      <div>
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
        <span data-testid={ `${ROUTE}__${VALUE}` }>{totalValue}</span>
      </button>
    </div>
  );
}
