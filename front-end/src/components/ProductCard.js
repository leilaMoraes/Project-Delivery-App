import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard(props) {
  const { price, imageSrc, altText, title, quantity } = props;
  const ROUTE = 'customer_products';
  const PRICE = 'element-card-price-<id>';
  const IMAGE = 'img-card-bg-image-<id>';
  const TITLE = 'element-card-title-<id>';
  const REMOVE = 'button-card-rm-item-<id>';
  const QUANTITY = 'input-card-quantity-<id>';
  const ADD = 'button-card-add-item-<id>';
  // add id to the end of each data-testid

  return (
    <div>
      <span data-testid={ `${ROUTE}__${PRICE}${ID}` }>{price}</span>
      <img data-testid={ `${ROUTE}__${IMAGE}${ID}` } src={ imageSrc } alt={ altText } />

      <div>
        <h2 data-testid={ `${ROUTE}__${TITLE}${ID}` }>{title}</h2>
        <div>
          <button data-testid={ `${ROUTE}__${REMOVE}${ID}` } type="button">-</button>
          <span data-testid={ `${ROUTE}__${QUANTITY}${ID}` }>{quantity}</span>
          <button data-testid={ `${ROUTE}__${ADD}${ID}` } type="button">+</button>
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
  quantity: PropTypes.number.isRequired,
};
