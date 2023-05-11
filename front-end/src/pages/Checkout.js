import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Input from '../components/Input';
import Table from '../components/Table';
import requests from '../services/requests';
import TotalPrice from '../components/TotalPrice';
import Title from '../components/Title';

export default function Checkout() {
  const table = ['Item', 'Description', 'Quantity', 'Unit Price', 'Sub-Total',
    'Remove Item'];

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
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center justify-evenly h-full">
      <Header />
      <div className="w-5/6 h-2/3">
        <Title name="Finish Orders" />
        <div
          // className="flex flex-col border shadow w-full h-5/6 overflow-x-auto"
          className="flex flex-col  h-5/6 overflow-x-auto
          border-border0 border-[1px] bg-bg0 w-full px-2 shadow-lg drop-shadow-md"
        >
          <Table
            tableH={ table }
            tableB={ cart }
            screen="checkout"
          />
          <TotalPrice testid="customer_checkout" />
        </div>
      </div>
      <div className="w-5/6 h-1/3">
        <Title name="Details and Delivery Address" />
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
