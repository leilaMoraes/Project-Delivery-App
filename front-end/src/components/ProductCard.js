import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function ProductCard(props) {
  const { price, imageSrc, altText, title, productId } = props;
  const { cart, addOneToCart, removeOneFromCart } = useContext(AppContext);

  const quantity = cart[productId] || 0;

  const handleAddToCart = () => {
    addOneToCart(productId, price);
  };

  const handleRemoveFromCart = () => {
    removeOneFromCart(productId, price);
  };

  const ROUTE = 'customer_products';
  const PRICE = 'element-card-price-';
  const IMAGE = 'img-card-bg-image-';
  const TITLE = 'element-card-title-';
  const REMOVE = 'button-card-rm-item-';
  const QUANTITY = 'input-card-quantity-';
  const ADD = 'button-card-add-item-';
  const ID = productId;

  return (
    <div>
      <span data-testid={ `${ROUTE}__${PRICE}<${ID}>` }>{price}</span>
      <img data-testid={ `${ROUTE}__${IMAGE}<${ID}>` } src={ imageSrc } alt={ altText } />

      <div>
        <h2 data-testid={ `${ROUTE}__${TITLE}<${ID}>` }>{title}</h2>
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
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  productId: PropTypes.number.isRequired,
};
