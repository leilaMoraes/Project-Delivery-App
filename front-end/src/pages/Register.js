import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import AppContext from '../context/AppContext';
import requests from '../services/requests';

function Register() {
  const { setUser, setToken } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();
  const magicPassword = 6;
  const magicName = 12;

  const onChange = ({ target }) => {
    setShowMessage(false);
    switch (target.name) {
    case 'inputName':
      setName(target.value);
      break;
    case 'inputEmail':
      setEmail(target.value);
      break;
    case 'inputPassword':
      setPassword(target.value);
      break;
    default:
    }
  };

  const onClickRegister = () => {
    const fetchRegister = async () => {
      try {
        const response = await requests
          .register({ name, email, password, role: 'customer' });
        console.log(response);
        setToken(response.data.token);
        setUser(response.data.user);
        const user = { ...response.data.user, token: response.data.token };
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(user));
        history.push('/customer/products');
      } catch (error) {
        setMessage(error.response.data.message);
        setShowMessage(true);
      }
      setName('');
      setEmail('');
      setPassword('');
    };
    fetchRegister();
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Register</h1>
      <div
        className="flex flex-col bg-bgLogin border border-bgLBorder shadow-lg p-8 m-4
        sm:w-3/4 md:w-1/3 lg:w-1/4"
      >
        <Input
          classLabel="mb-2 text-black"
          label="Nome"
          classInput="mt-2 border border-gray-400 py-3 px-4 rounded w-full shadow"
          type="text"
          inputName="inputName"
          id="inputName"
          value={ name }
          dataName="common_register__input-name"
          onChange={ onChange }
        />
        {name !== ''
        && name.length < magicName && (
          <p className="mt-1 mb-1 text-red-600">Name must be 12 characters</p>)}
        <Input
          classLabel="mt-2 text-black"
          label="Email"
          classInput="mt-2 mb-2 border border-gray-400
          py-3 px-4 rounded w-full shadow"
          type="text"
          inputName="inputEmail"
          id="inputEmail"
          value={ email }
          dataName="common_register__input-email"
          onChange={ onChange }
        />
        {email !== ''
        && !(email.match(/\S+@\S+\.\S+/i)) && (
          <p className="mt-1 mb-1 text-red-600">Invalid Email</p>)}
        <Input
          classLabel="mt-2 text-black"
          label="Senha"
          classInput="mt-2 mb-2 border border-gray-400 py-3 px-4 rounded w-full shadow"
          type="password"
          inputName="inputPassword"
          id="inputPassword"
          value={ password }
          dataName="common_register__input-password"
          onChange={ onChange }
        />
        {password !== ''
        && password.length < magicPassword && (
          <p className="mt-1 mb-1 text-red-600">Password must be 6 characters</p>)}
        <Button
          btnClass="mt-6 bg-green-dark hover:bg-green-hover1 text-white py-3 px-4
          rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          dataName="common_register__button-register"
          disabled={ !(email.match(/\S+@\S+\.\S+/i)) || (password.length < magicPassword) || (name.length < magicName) }
          onClick={ onClickRegister }
          btnName="CADASTRAR"
        />
      </div>
      {showMessage
        && (
          <p
            className="mt-1 text-red-600 text-lg"
            data-testid="common_register__element-invalid_register"
          >
            {message}
          </p>)}
    </div>
  );
}

export default Register;
