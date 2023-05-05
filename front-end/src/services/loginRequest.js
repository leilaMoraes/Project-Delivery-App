import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const loginRequest = {
  login: (login) => instance.post('/login', login),
};

export default loginRequest;
