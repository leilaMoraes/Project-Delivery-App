import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function ProductCard(props) {
  const { price, urlImage, name, id } = props;
  const { cart, addToCart } = useContext(AppContext);

  const [quantity, setQuantity] = useState(cart[id] ? cart[id].quantity : 0);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!Number.isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
      addToCart(id, name, price, newQuantity);
    }
  };

  const handleAddOne = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(id, name, price, newQuantity);
  };

  const handleRemoveOne = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      addToCart(id, name, price, newQuantity);
    }
  };

  return (
    <div
      className="border border-border0 shadow-md overflow-hidden
     w-[359px] h-[479px] flex flex-col justify-end"
      id="teste1"
    >
      <div
        className="relative h-full"
        id="teste1"
      >
        <div
          className="absolute top-0 left-0 bg-bg0
           text-black font-bold px-3 py-1 z-10 m-2"
          id="teste1"
        >
          R$
          {' '}
          <span
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            {price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
          // className="w-[120px] h-[120px]"
          className="absolute h-full object-cover inset-0 mx-auto"
        />
      </div>

      <div
        className="p-4 bg-bg0"
        id="teste1"
      >
        <div
          className="flex flex-col justify-center"
          id="teste1"
        >
          <h2
            data-testid={ `customer_products__element-card-title-${id}` }
            className="font-bold mb-2 text-center"
          >
            {name}
          </h2>
          <div
            className="flex justify-center"
            id="teste1"
          >
            <button
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              className="rounded-l-lg bg-green-dark w-7 h-7
               font-extrabold text-white"
              type="button"
              onClick={ handleRemoveOne }
            >
              -
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${id}` }
              className="w-12 text-center border-2 border-green-dark "
              type="number"
              min="0"
              value={ quantity }
              onChange={ handleQuantityChange }
            />
            <button
              NEEED
              TO
              ALIGNT
              BUTTON
              TEXT
              data-testid={ `customer_products__button-card-add-item-${id}` }
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
