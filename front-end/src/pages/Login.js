import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import AppContext from '../context/AppContext';
import requests from '../services/requests';
import { getRoute } from '../utils/tokenValidation';

function Login() {
  const { setUser, setToken, token } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const magicNumber = 6;

  const onChange = ({ target }) => {
    setShowMessage(false);
    switch (target.name) {
      case 'inputEmail':
        setEmail(target.value);
        break;
      case 'inputPassword':
        setPassword(target.value);
        break;
      default:
    }
  };

  const onClickLogin = () => {
    const fetchLogin = async () => {
      try {
        const response = await requests.login({ email, password });
        await setToken(response.data.token);
        await setUser(response.data.user);
        const user = { ...response.data.user, token: response.data.token };
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(user));
        const route = getRoute(response.data.user.role);
        navigate(route);
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.message);
        setShowMessage(true);
      }
    };
    fetchLogin();
  };

  const onClickRegister = () => {
    navigate('/register');
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Nome do App</h1>
      <div
        className="flex flex-col bg-bgLogin border border-bgLBorder shadow-lg p-8 m-4
        sm:w-3/4 md:w-1/3 lg:w-1/4"
      >
        <Input
          classLabel="mb-2 text-black"
          label="Email"
          classInput="mt-2 border border-gray-400
          py-3 px-4 rounded w-full shadow"
          type="text"
          inputName="inputEmail"
          id="inputEmail"
          value={email}
          dataName="common_login__input-email"
          onChange={onChange}
        />
        <Input
          classLabel="mt-2 text-black"
          label="Senha"
          classInput="mt-2 border border-gray-400 py-3 px-4 rounded w-full shadow"
          type="password"
          inputName="inputPassword"
          id="inputPassword"
          value={password}
          dataName="common_login__input-password"
          onChange={onChange}
        />
        <Button
          btnClass="mt-6 bg-green-dark hover:bg-green-hover1 text-white py-3 px-4
          rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          dataName="common_login__button-login"
          disabled={!(email.match(/\S+@\S+\.\S+/i)) || (password.length < magicNumber)}
          onClick={onClickLogin}
          btnName="LOGIN"
        />
        <Button
          btnClass="mt-4 bg-bgLogin border
          border-green-dark hover:bg-green-hover3 text-green-dark py-3 px-4
          rounded-lg text-lg"
          dataName="common_login__button-register"
          onClick={onClickRegister}
          btnName="Ainda não tenho conta"
        />
      </div>
      {showMessage
        && (
          <p
            className="mt-1 text-red-600 text-lg"
            data-testid="common_login__element-invalid-email"
          >
            {message}
          </p>)}
    </div>
  );
}

export default Login;
