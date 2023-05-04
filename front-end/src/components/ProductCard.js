import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function ProductCard(props) {
  const { price, urlImage, name, id } = props;
  const { cart, addOneToCart, removeOneFromCart } = useContext(AppContext);

  const quantity = cart[id] || 0;

  const handleAddToCart = () => {
    addOneToCart(id, price);
  };

  const handleRemoveFromCart = () => {
    removeOneFromCart(id, price);
  };

  const ROUTE = 'customer_products';
  const PRICE = 'element-card-price-';
  const IMAGE = 'img-card-bg-image-';
  const TITLE = 'element-card-title-';
  const REMOVE = 'button-card-rm-item-';
  const QUANTITY = 'input-card-quantity-';
  const ADD = 'button-card-add-item-';
  const ID = id;

  return (
    <div>
      <span data-testid={ `${ROUTE}__${PRICE}<${ID}>` }>{price}</span>
      <img data-testid={ `${ROUTE}__${IMAGE}<${ID}>` } src={ urlImage } alt={ name } />

      <div>
        <h2 data-testid={ `${ROUTE}__${TITLE}<${ID}>` }>{name}</h2>
        <div>
          <button
            data-testid={ `${ROUTE}__${REMOVE}<${ID}>` }
            type="button"
            onClick={ handleRemoveFromCart }
          >
            -
          </button>
          <span data-testid={ `${ROUTE}__${QUANTITY}<${ID}>` }>{quantity}</span>
          <button
            data-testid={ `${ROUTE}__${ADD}<${ID}>` }
            type="button"
            onClick={ handleAddToCart }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
