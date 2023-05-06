import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const registerRequest = {
  register: (newUser) => instance.post('/register', newUser),
};

export default registerRequest;
