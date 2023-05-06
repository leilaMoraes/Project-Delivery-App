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
        console.log('algo está errado');
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
    <div>
      <h1>Register</h1>
      <Input
        label="Nome"
        type="text"
        inputName="inputName"
        id="inputName"
        value={name}
        dataName="common_register__input-name"
        onChange={onChange}
      />
      {name !== ''
        && name.length < magicName && <p>Name must be 12 characters</p>}
      <Input
        label="Email"
        type="text"
        inputName="inputEmail"
        id="inputEmail"
        value={email}
        dataName="common_register__input-email"
        onChange={onChange}
      />
      {email !== ''
        && !(email.match(/\S+@\S+\.\S+/i)) && <p>Invalid Email</p>}
      <Input
        label="Senha"
        type="password"
        inputName="inputPassword"
        id="inputPassword"
        value={password}
        dataName="common_register__input-password"
        onChange={onChange}
      />
      {password !== ''
        && password.length < magicPassword && <p>Password must be 6 characters</p>}
      <Button
        dataName="common_register__button-register"
        disabled={!(email.match(/\S+@\S+\.\S+/i)) || (password.length < magicPassword) || (name.length < magicName)}
        onClick={onClickRegister}
        btnName="CADASTRAR"
      />
      {showMessage
        && <p data-testid="common_register__element-invalid_register">{message}</p>}
    </div>
  );
}

export default Register;
