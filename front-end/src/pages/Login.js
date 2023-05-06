import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import AppContext from '../context/AppContext';
import loginRequest from '../services/loginRequest';

function Login() {
  const { setUser, setToken } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();
  const magicNumber = 6;

  const onClickLogin = () => {
    const fetchLogin = async () => {
      try {
        const response = await loginRequest
          .login({ email, password });
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user));
        history.push('/customer/products');
      } catch (error) {
        setMessage(error.response.data.message);
        setShowMessage(true);
      }
      setEmail('');
      setPassword('');
    };
    fetchLogin();
  };

  const onClickRegister = () => {
    history.push('/register');
  };

  return (
    <div>
      <Input
        label="Email"
        type="text"
        inputName="inputEmail"
        id="inputEmail"
        value={ email }
        dataName="common_login__input-email"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <Input
        label="Senha"
        type="password"
        inputName="inputPassword"
        id="inputPassword"
        value={ password }
        dataName="common_login__input-password"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <Button
        dataName="common_login__button-login"
        disabled={ !(email.match(/\S+@\S+\.\S+/i)) || (password.length < magicNumber) }
        onClick={ onClickLogin }
        btnName="LOGIN"
      />
      <Button
        dataName="common_login__button-register"
        onClick={ onClickRegister }
        btnName="Ainda não tenho conta"
      />
      { showMessage
      && <p data-testid="common_login__element-invalid-email">{message}</p>}
    </div>
  );
}

export default Login;
