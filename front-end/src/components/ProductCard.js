import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard(props) {
  const { price, imageSrc, altText, title, quantity } = props;
  return (
    <div>
      <span>{price}</span>
      <img src={ imageSrc } alt={ altText } />

      <div>
        <h2>{title}</h2>
        <div>
          <button type="button">-</button>
          <span>{quantity}</span>
          <button type="button">+</button>
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
