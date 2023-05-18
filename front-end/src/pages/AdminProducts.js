/* eslint-disable react/jsx-max-depth */
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import socketIo from 'socket.io-client';
import Header from '../components/Header';
import requests from '../services/requests';
import AppContext from '../context/AppContext';
import placeholderImg from '../images/placeholder_600x.webp';
import ProductTable from '../components/ProductTable';
import Title from '../components/Title';

export default function AdminProducts() {
  const { token } = useContext(AppContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState(placeholderImg);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });
    socket.on('products@new', (product) => {
      setProducts((prevState) => prevState.concat(product));
    });
    socket.on('products@delete', (productName) => {
      setProducts((prevState) => prevState.filter((item) => item.name !== productName));
    });
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const headers = { headers: { authorization: token } };
        const response = await requests.getProducts(headers);
        setProducts(response.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchProducts();
  }, []);
  const handleImage = (file) => {
    if (!file) {
      setPreview('');
      setImage('');
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', image);
      const headers = {
        headers: {
          'content-type': 'multipart/form-data',
          authorization: token,
        },
      };
      await requests.postProduct(formData, headers);
      toast.success('Product successfully registered!');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setName('');
      setPrice(0);
      setImage('');
      setPreview(placeholderImg);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const headers = { headers: { authorization: token } };
      await requests.deleteProduct(id, headers);
      // setProducts(products.filter((product) => product.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-wrap items-center justify-center">
      <Header />
      <div className="flex flex-wrap mt-7 sm:mt-16 mb-3 w-[95%] sm:w-5/6 justify-center">
        <div className="mb-5">
          <Title name="Register New Product" />
          <form
            action=""
            className="flex flex-wrap justify-center border
          border-gray-300 bg-bg1 px-3 shadow-lg gap-2"
            onSubmit={ handleSubmit }
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="flex flex-col my-1">
                Name
                <input
                  type="text"
                  id="name"
                  placeholder="Item Name"
                  value={ name }
                  onChange={ ({ target }) => setName(target.value) }
                  className="border border-gray-400 bg-white py-3 px-4 rounded shadow"
                />
              </label>
              <label htmlFor="price" className="flex flex-col my-1">
                Price
                <input
                  type="number"
                  id="price"
                  value={ price }
                  placeholder="0.00"
                  onChange={ ({ target }) => setPrice(target.value) }
                  className="border border-gray-400 bg-white py-3 px-4 rounded shadow"
                />
              </label>
              <label htmlFor="image" className="flex flex-col my-1">
                Image
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={ ({ target }) => handleImage(target.files[0]) }
                  className="border border-gray-400 bg-white py-3 px-4 rounded shadow"
                />
              </label>
              <button
                type="submit"
                className="bg-green-dark rounded-lg
                px-3.5 py-2 my-3
            text-xl font-medium text-white disabled:opacity-80
            disabled:cursor-not-allowed hover:bg-green-hover1"
              >
                Add Product
              </button>
            </div>

            <img
              src={ preview }
              alt="File preview"
              className="border-border0 border-[1px]
              my-3 ml-1.5 min-w-[180px] max-w-[250px] "
            />

          </form>
        </div>

        <div
          className="flex flex-col  h-5/6 overflow-x-auto
                  border-border0 border-[1px] bg-tableBg w-full px-2 pb-2 pt-1
                  shadow-lg drop-shadow-md"
        >
          <ProductTable products={ products } deleteProduct={ deleteProduct } />
        </div>
      </div>
    </div>
  );
}
