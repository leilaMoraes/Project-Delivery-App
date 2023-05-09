import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Input from '../components/Input';
import CheckoutTable from '../components/CheckoutTable';
import requests from '../services/requests';
import TotalPrice from '../components/TotalPrice';

export default function Checkout() {
  const table = ['Item', 'Description', 'Quantity', 'Unit Price', 'Sub-Total',
    'Remove Item'];

  const history = useHistory();
  const { totalValue, token, cart, user } = useContext(AppContext);
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
      sellerId: 2,
      totalPrice: totalValue,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      cart: cartItems,
    };

    try {
      const headers = { headers: { authorization: token } };
      const response = await requests.postSale(saleData, headers);
      const saleId = response.data.id;
      history.push(`/customer/orders/${saleId}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen ">
      <Header />
      <div className="mt-20 w-5/6 h-3/4">
        <h1 className="font-medium mb-3">Finish Orders</h1>
        <div
          className="flex flex-col border shadow justify-between w-full h-full
          overflow-x-auto"
        >
          <CheckoutTable
            table={ table }
            cartItems={ cart }
            screen="checkout"
          />
          <TotalPrice testid="customer_checkout" />
        </div>
      </div>
      <div className="mt- 20 w-5/6 h-2/4">
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
