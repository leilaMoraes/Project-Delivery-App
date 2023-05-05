import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

// Set default headers, such as the Authorization header for authenticated requests
// instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
const headers = { headers: { Authorization: localStorage.getItem('token') } };
// const headers = { headers: { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjgzMzA5MzI5LCJleHAiOjE2ODMzMjAxMjl9.ubyYKUIQBoUR3FVaS7LxwdXYnBwV4pVFn0mehor5CKU' } };

// Define API endpoints as functions that return the results of axios requests
const requests = {
  getProducts: () => instance.get('/products', headers),
  getProduct: (productId) => instance.get(`/products/${productId}`),
  postProduct: (productData) => instance.post('/products', productData),
  putProduct: (productId, productData) => instance
    .put(`/products/${productId}`, productData),
  deleteProduct: (productId) => instance.delete(`/products/${productId}`),
  // Add more endpoints as needed
};

export default requests;
