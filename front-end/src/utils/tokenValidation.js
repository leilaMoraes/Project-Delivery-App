import jwt from 'jwt-decode';

export const getRoute = (role) => {
  const routes = {
    customer: '/customer/products',
    seller: '/seller/orders',
    administrator: '/admin/manage',
  };
  return routes[role];
};

const isTokenValid = () => {
  const THOUSAND = 1000;
  const token = localStorage.getItem('token');
  if (!token) return false;
  const decodedToken = jwt(token);
  if (Date.now() > decodedToken.exp * THOUSAND) return false;
  return getRoute(decodedToken.role);
};

export default isTokenValid;
