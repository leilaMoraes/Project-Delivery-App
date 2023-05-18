/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Input from '../components/Input';
import Table from '../components/Table';
import requests from '../services/requests';
import TotalPrice from '../components/TotalPrice';
// import TableTotalPrice from '../components/TotalPrice';
import Title from '../components/Title';
import Button from '../components/Button';
import LoadAnimation from '../components/LoadAnimation';

export default function Checkout() {
  const table = ['Item', 'Description', 'Quantity', 'Unit Price', 'Sub-Total',
    'Remove Item'];

  const navigate = useNavigate();
  const { totalValue, token, cart, user, getSales, setCart } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const [salesperson, setSalesperson] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSellers() {
      const headers = { headers: { authorization: token } };
      const response = await requests.getSellers(headers);
      setSellers(response.data);
    }
    fetchSellers();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [cart]);

  // useEffect(() => {
  //   async function fetchSellers() {
  //     const headers = { headers: { authorization: token } };
  //     const response = await requests.getSellers(headers);
  //     setSellers(response.data);
  //   }
  //   fetchSellers();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
      navigate(`/customer/orders/${saleId}`);
      setCart({});
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="mt-8 md:mt-16 flex flex-col items-center justify-evenly
    h-full w-[97%] md:w-5/6 m-auto max-w-[1100px] mb-4"
    >
      <Header />
      {loading ? <LoadAnimation /> : (
        <>
          <Title name="Finish Order" />
          <div
            // className="flex flex-col border shadow w-full h-5/6 overflow-x-auto"
            className="flex flex-col  h-5/6 overflow-x-auto
          border-border0 border-[1px] bg-tableBg w-full px-2 pb-2 pt-1
          shadow-lg drop-shadow-md"
          >
            <Table
              tableH={ table }
              tableB={ cart }
              screen="checkout"
            />
            <TotalPrice testid="customer_checkout" total={ totalValue } />
          </div>

          <Title name="Details and Delivery Address" />
          <div
            className="bg-tableBg flex flex-col overflow-x-auto
        border-border0 border-[1px]  w-full px-2 pb-2 pt-1
        shadow-lg drop-shadow-md"
            // className="w-5/6 h-1/3"
          >
            <div className="w-full flex flex-col md:flex-row gap-2">
              <label htmlFor="salespersonInput" className="w-full md:w-fit flex flex-col">
                Seller
                <select
                  id="salespersonInput"
                  value={ salesperson }
                  onChange={ ({ target }) => setSalesperson(target.value) }
                  data-testid="customer_checkout__select-seller"
                  className="mt-2 border border-gray-400
            py-[14px] px-4 rounded shadow"
                >
                  <option value="">Select a seller</option>
                  {sellers.map((seller) => (
                    <option key={ seller.id } value={ seller.id }>
                      {seller.name}
                    </option>
                  ))}
                </select>
              </label>
              <Input
                label="Addess"
                type="text"
                inputName="addressInput"
                classLabel="mb-2 text-black flex flex-col w-full"
                id="addressInput"
                value={ address }
                dataName="customer_checkout__input-address"
                classInput="mt-2 border border-gray-400 bg-white
            py-3 px-4 rounded shadow w-auto"
                onChange={ ({ target }) => setAddress(target.value) }
              />
              <Input
                label="Number"
                type="text"
                inputName="addressNumberInput"
                classLabel="mb-2 text-black flex flex-col w-full md:w-[180px]"
                id="addressNumberInput"
                value={ addressNumber }
                dataName="customer_checkout__input-address-number"
                classInput="mt-2 border border-gray-400
            py-3 px-4 rounded shadow"
                onChange={ ({ target }) => setAddressNumber(target.value) }
              />
            </div>

            <Button
              btnClass="bg-green-dark rounded-lg self-center
          w-fit m-2 mt-4 w:px-20 px-10 py-4
          text-2xl font-bold text-white
          disabled:opacity-80 disabled:cursor-not-allowed hover:bg-green-hover1 "
              dataName="customer_checkout__button-submit-order"
              // disabled={ status !== 'Preparando' }
              btnName="FINISH ORDER"
              onClick={ handleFinishOrder }
            />
          </div>
        </>
      )}
    </div>
  );
}
