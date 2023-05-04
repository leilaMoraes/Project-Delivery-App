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
    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
      <div className="relative h-48">
        <span
          data-testid={ `${ROUTE}__${PRICE}<${ID}>` }
          className="absolute top-0 left-0 bg-gray-200
          text-black font-bold px-3 py-1 z-10"
        >
          R$
          {' '}
          {price}
        </span>
        <img
          data-testid={ `${ROUTE}__${IMAGE}<${ID}>` }
          src={ urlImage }
          alt={ name }
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
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
              className="rounded-full bg-gray-200 px-3 py-1 mr-2"
              type="button"
              onClick={ handleRemoveOne }
            >
              -
            </button>
            <input
              data-testid={ `${ROUTE}__${QUANTITY}<${ID}>` }
              className="w-12 text-center"
              type="number"
              min="0"
              value={ quantity }
              onChange={ handleQuantityChange }
            />
            <button
              data-testid={ `${ROUTE}__${ADD}<${ID}>` }
              className="rounded-full bg-gray-200 px-3 py-1 mr-2"
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
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

// import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types';
// import AppContext from '../context/AppContext';

// export default function ProductCard(props) {
//   const { price, urlImage, name, id } = props;
//   const { cart, addToCart } = useContext(AppContext);

//   const [quantity, setQuantity] = useState(cart[id] || 0);

//   const handleQuantityChange = (event) => {
//     const newQuantity = parseInt(event.target.value, 10);
//     if (!Number.isNaN(newQuantity) && newQuantity >= 0) {
//       setQuantity(newQuantity);
//       addToCart(id, price, newQuantity);
//     }
//   };

//   const handleAddOne = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     addToCart(id, price, newQuantity);
//   };

//   const handleRemoveOne = () => {
//     if (quantity > 0) {
//       const newQuantity = quantity - 1;
//       setQuantity(newQuantity);
//       addToCart(id, price, newQuantity);
//     }
//   };

//   const ROUTE = 'customer_products';
//   const ID = id;

//   return (
//     <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
//       <img data-testid={ `${ROUTE}__img-card-bg-image-<${ID}>` } src={ urlImage } alt={ name } className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h2 data-testid={ `${ROUTE}__element-card-title-<${ID}>` } className="font-bold mb-2">{name}</h2>
//         <div className="flex justify-between items-center">
//           <span data-testid={ `${ROUTE}__element-card-price-<${ID}>` } className="font-bold text-lg">
//             $
//             {price}
//           </span>
//           <div className="flex items-center">
//             <button data-testid={ `${ROUTE}__button-card-rm-item-<${ID}>` } className="rounded-full bg-gray-200 px-3 py-1 mr-2" onClick={ handleRemoveOne }>-</button>
//             <input data-testid={ `${ROUTE}__input-card-quantity-<${ID}>` } className="w-12 text-center" type="number" min="0" value={ quantity } onChange={ handleQuantityChange } />
//             <button data-testid={ `${ROUTE}__button-card-add-item-<${ID}>` } className="rounded-full bg-gray-200 px-3 py-1 ml-2" onClick={ handleAddOne }>+</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ProductCard.propTypes = {
//   price: PropTypes.string.isRequired,
//   urlImage: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
// };
