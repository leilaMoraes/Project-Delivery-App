import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Input from '../components/Input';
import CheckoutTable from '../components/CheckoutTable';
import requests from '../services/requests';

export default function Checkout() {
  const history = useHistory();
  const { totalValue,
    token,
    cart,
    user,
    salesperson,
    setSalesperson,
    address,
    setAddress,
    addressNumber,
    setAddressNumber } = useContext(AppContext);
  const [saleId, setSaleId] = useState(null);

  const registerSale = async (saleData) => {
    // IS THIS TRY CATCH NEEDED?
    try {
      const headers = { headers: { authorization: token } };
      const response = await requests.postSale(saleData, headers);
      setSaleId(response.data.id);
    } catch (error) {
      console.log(error);
      // Handle error here, e.g. show an error message to the user
    }
  };

  const handleFinishOrder = async () => {
    const cartItems = Object.entries(cart).map(([id, { quantity }]) => ({
      productId: id,
      quantity,
    }));
    const saleData = {
      userId: user.id,
      sellerId: 2,
      totalPrice: totalValue,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      cart: cartItems,
    };
      // IS THIS TRY CATCH NEEDED?
    try {
      await registerSale(saleData);
      history.push(`/customer/orders/${saleId}`);
    } catch (error) {
      console.log(error);
      // Handle error here, e.g. show an error message to the user
    }
  };
  const headers = { headers: { authorization: token } };

  const sellers = async () => {
    await requests.getSellers(headers);
  };
  console.log(sellers);

  // const registerSale = async () => {
  //   const headers = { headers: { authorization: token } };
  //   const response = await requests.postSale(saleData, headers);
  //   const saleId = response.data.id;
  //   setProducts(response.data);
  // };

  // const handleFinishOrder = () => {
  //   const cartItems = Object.entries(cart).map(([id, { quantity }]) => ({
  //     productId: id,
  //     quantity,
  //   }));
  //   const saleData = {
  //     userId: 3,
  //     sellerId: 2,
  //     totalPrice: totalValue,
  //     deliveryAddress: address,
  //     deliveryNumber: addressNumber,
  //     cart: cartItems,
  //   };

  //   history.push(`/customer/orders/${saleId}`);
  // };

  return (
    <div className="border-t-[20px]">
      <Header />
      <div>
        <h1>Finish Order</h1>
        <CheckoutTable />
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          Total: R$
          {' '}
          { totalValue.toFixed(2).replace('.', ',')}
        </span>
      </div>

      <div>
        <h1>Details and Delivery Address</h1>
        <div>
          <Input
            label="Responsible Salesperson"
            // Lista de vendedores
            type="text"
            inputName="salespersonInput"
            id="salespersonInput"
            value={ salesperson }
            dataName="customer_checkout__select-seller"
            onChange={ ({ target }) => setSalesperson(target.value) }
          />
          <Input
            label="Addess"
            type="text"
            inputName="addressInput"
            id="addressInput"
            value={ address }
            dataName="customer_checkout__input-address"
            onChange={ ({ target }) => setAddress(target.value) }
          />
          <Input
            label="Number"
            type="text"
            inputName="addressNumberInput"
            id="addressNumberInput"
            value={ addressNumber }
            dataName="customer_checkout__input-address-number"
            onChange={ ({ target }) => setAddressNumber(target.value) }
          />
        </div>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleFinishOrder }
        >
          FINISH ORDER
        </button>
      </div>
    </div>
  );
}
