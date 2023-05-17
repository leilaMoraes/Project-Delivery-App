import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import requests from '../services/requests';
import AppContext from '../context/AppContext';
import placeholderImg from '../images/placeholder_600x.webp';
// import ProductTable from '../components/ProductTable';

export default function AdminProducts() {
  const { token } = useContext(AppContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState(placeholderImg);
  const [products, setProducts] = useState([]);
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
    }
  };
  const deleteProduct = async (id) => {
    try {
      const headers = { headers: { authorization: token } };
      await requests.deleteProduct(id, headers);
      setProducts(products.filter((product) => product.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-wrap items-center justify-center">
      <Header />

      <div className="flex flex-wrap mt-16 justify-center">
        {/* <form
          action=""
          className="flex flex-col justify-center"
          onSubmit={ handleSubmit }
        >
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              value={ price }
              onChange={ ({ target }) => setPrice(target.value) }
            />
          </label>
          <label htmlFor="image">
            Image
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={ ({ target }) => handleImage(target.files[0]) }
            />
          </label>
          <button type="submit">Add Product</button>
        </form> */}

        <form
          action=""
          className="flex flex-col justify-center border
          border-gray-300 bg-gray-100 px-2 py-1 shadow-lg gap-2 m-2"
          onSubmit={ handleSubmit }
        >
          <label htmlFor="name" className="flex flex-col">
            Name
            <input
              type="text"
              id="name"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
              className="border border-gray-400 bg-white py-3 px-4 rounded shadow"
            />
          </label>
          <label htmlFor="price" className="flex flex-col">
            Price
            <input
              type="number"
              id="price"
              value={ price }
              onChange={ ({ target }) => setPrice(target.value) }
              className="border border-gray-400 bg-white py-3 px-4 rounded shadow"
            />
          </label>
          <label htmlFor="image" className="flex flex-col">
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
            className="bg-green-dark rounded-lg px-3.5 py-2
            text-xl font-medium text-white disabled:opacity-80
            disabled:cursor-not-allowed hover:bg-green-hover1"
          >
            Add Product
          </button>
        </form>
        {/* <div className="w-[180px]"> */}

        <img
          src={ preview }
          alt="File preview"
          width={ 180 }
          className="m-2"
        />
        {/* </div> */}
      </div>
      {/* <ProductTable products={ products } deleteProduct={ deleteProduct } /> */}
    </div>
  );
}
