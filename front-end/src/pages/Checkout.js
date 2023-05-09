import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Input from '../components/Input';
import CheckoutTable from '../components/CheckoutTable';
import requests from '../services/requests';

export default function Checkout() {
  const navigate = useNavigate();
  const { totalValue, token, cart, user, getSales } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const [salesperson, setSalesperson] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

  useEffect(() => {}, [cart]);
  useEffect(() => {
    async function fetchSellers() {
      const headers = { headers: { authorization: token } };
      const response = await requests.getSellers(headers);
      setSellers(response.data);
    }
    fetchSellers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFinishOrder = async () => {
    const cartItems = Object.entries(cart).map(([id, { quantity }]) => ({
      productId: id,
      quantity,
    }));
    const saleData = {
      userId: user.id,
      sellerId: salesperson,
      totalPrice: totalValue,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      cart: cartItems,
    };

    try {
      const headers = { headers: { authorization: token } };
      const response = await requests.postSale(saleData, headers);
      const saleId = response.data.id;
      await getSales();
      // console.log(response.data);
      // console.log(saleId);
      navigate(`/customer/orders/${saleId}`);
      // navigate('/customer/orders/1');
    } catch (error) {
      console.log(error);
      // ADD TOSTIFY ERROR MESSAGE
    }
  };

  return (
    <div className="border-t-[20px]">
      <Header />
      <div>
        <h1>Finish Order</h1>
        <CheckoutTable cartItems={ cart } userType="customer" />
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          Total: R$
          {' '}
          {totalValue.toFixed(2).replace('.', ',')}
        </span>
      </div>

      <div>
        <h1>Details and Delivery Address</h1>
        <div>
          <select
            id="salespersonInput"
            value={ salesperson }
            onChange={ ({ target }) => setSalesperson(target.value) }
            data-testid="customer_checkout__select-seller"
          >
            <option value="">Select a seller</option>
            {sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>
                {seller.name}
              </option>
            ))}
          </select>
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
