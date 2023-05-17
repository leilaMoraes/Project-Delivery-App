import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import requests from '../services/requests';
import AppContext from '../context/AppContext';
// import ProductTable from '../components/ProductTable';

export default function AdminProducts() {
  const { token } = useContext(AppContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
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
    <>
      <Header />
      <div className="flex flex-row mt-12 w-64">
        <form
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
        </form>
        <img src={ preview } alt="File preview" width={ 180 } />
      </div>
      {/* <ProductTable products={ products } deleteProduct={ deleteProduct } /> */}
    </>
  );
}
