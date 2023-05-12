import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Set default headers, such as the Authorization header for authenticated requests
// instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
// const headers = { headers: { Authorization: localStorage.getItem('token') } };
// Define API endpoints as functions that return the results of axios requests

const requests = {
  login: (login) => instance.post('/login', login),
  register: (newUser) => instance.post('/register', newUser),
  getProducts: (headers) => instance.get('/products', headers),
  // getSales: (id, headers) => instance.get(`/sales/seller/${id}`, headers),
  getSellers: (headers) => instance.get('/sellers', headers),
  getUsers: (headers) => instance.get('/admin', headers),
  postProduct: (productData) => instance.post('/products', productData),
  postSale: (saleData, headers) => instance.post('/sales', saleData, headers),
  postUser: (data, headers) => instance.post('/admin', data, headers),
  deleteUser: (id, headers) => instance.delete(`/admin/${id}`, headers),
  salesSeller: (id, headers) => instance.get(`/sales/seller/${id}`, headers),
  salesCustomer: (id, headers) => instance.get(`/sales/customer/${id}`, headers),
  getSales: (role, id, headers) => instance.get(`/sales/${role}/${id}`, headers),
  patchStatus: (id, status, headers) => {
    instance.patch(`/sales/status/${id}`, { status }, headers);
  },
};

export default requests;
