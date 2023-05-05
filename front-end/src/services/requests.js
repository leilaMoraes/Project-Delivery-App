import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
// Set default headers, such as the Authorization header for authenticated requests
// instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
// const headers = { headers: { Authorization: localStorage.getItem('token') } };
// Define API endpoints as functions that return the results of axios requests
const requests = {
  getProducts: (headers) => instance.get('/products', headers),
  postProduct: (productData) => instance.post('/products', productData),
  getUsers: (headers) => instance.get('/admin', headers),
  postUser: (data, headers) => instance.post('/admin', data, headers),
  deleteUser: (id, headers) => instance.delete(`/admin/${id}`, headers),
};

export default requests;
