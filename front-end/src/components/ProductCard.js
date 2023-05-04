import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function ProductCard(props) {
  const { price, urlImage, name, id } = props;
  const { cart, addToCart } = useContext(AppContext);

  const [quantity, setQuantity] = useState(cart[id] || 0);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!Number.isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
      addToCart(id, price, newQuantity);
    }
  };

  const handleAddOne = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(id, price, newQuantity);
  };

  const handleRemoveOne = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      addToCart(id, price, newQuantity);
    }
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
            onClick={ handleRemoveOne }
          >
            -
          </button>
          <input
            data-testid={ `${ROUTE}__${QUANTITY}<${ID}>` }
            type="number"
            min="0"
            value={ quantity }
            onChange={ handleQuantityChange }
          />
          <button
            data-testid={ `${ROUTE}__${ADD}<${ID}>` }
            type="button"
            onClick={ handleAddOne }
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
