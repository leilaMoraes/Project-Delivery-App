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
    <div
      className="border border-border0 shadow-md overflow-hidden
    w-[359px] h-[479px] flex flex-col justify-end"
    >
      <div className="relative h-full">
        <span
          data-testid={ `${ROUTE}__${PRICE}<${ID}>` }
          className="absolute top-0 left-0 bg-bg0
          text-black font-bold px-3 py-1 z-10 m-2"
        >
          R$
          {' '}
          {price.toFixed(2)}
        </span>
        <img
          data-testid={ `${ROUTE}__${IMAGE}<${ID}>` }
          src={ urlImage }
          alt={ name }
          className="absolute h-full object-cover inset-0 mx-auto"
        />
      </div>

      <div className="p-4 bg-bg0">
        <div className="flex flex-col justify-center">
          <h2
            data-testid={ `${ROUTE}__${TITLE}<${ID}>` }
            className="font-bold mb-2 text-center"
          >
            {name}
          </h2>
          <div className="flex justify-center">
            <button
              data-testid={ `${ROUTE}__${REMOVE}<${ID}>` }
              className="rounded-l-lg bg-green-dark w-7 h-7
              font-extrabold text-white"
              type="button"
              onClick={ handleRemoveOne }
            >
              -
            </button>
            <input
              data-testid={ `${ROUTE}__${QUANTITY}<${ID}>` }
              className="w-12 text-center border-2 border-green-dark "
              type="number"
              min="0"
              value={ quantity }
              onChange={ handleQuantityChange }
            />
            <button
              // NEEED TO ALIGNT BUTTON TEXT
              data-testid={ `${ROUTE}__${ADD}<${ID}>` }
              className="rounded-r-lg bg-green-dark w-7 h-7
              font-extrabold text-white "
              type="button"
              onClick={ handleAddOne }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
