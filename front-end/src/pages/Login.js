import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setPassWord] = useState('');
  const history = useHistory();
  const magicNumber = 6;

  const onClickLogin = () => {
    console.log('login');
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
        dataName="common_login__input-email"
        onChange={ ({ target }) => setInputEmail(target.value) }
      />
      <Input
        label="Senha"
        type="password"
        inputName="inputPassword"
        id="inputPassword"
        dataName="common_login__input-password"
        onChange={ ({ target }) => setPassWord(target.value) }
      />
      <Button
        dataName="common_login__button-login"
        disabled={ !(inputEmail.match(/\S+@\S+\.\S+/i)) || (inputPassword.length < magicNumber) }
        onClick={ onClickLogin }
        btnName="LOGIN"
      />
      <Button
        dataName="common_login__button-register"
        onClick={ onClickRegister }
        btnName="Ainda não tenho conta"
      />
      <p
        data-testid="common_login__element-invalid-email"
      />
    </div>
  );
}

export default Login;
