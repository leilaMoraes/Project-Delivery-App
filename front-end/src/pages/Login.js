import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
      <label htmlFor="inputEmail">
        Email
        <input
          type="text"
          name="inputEmail"
          id="inputEmail"
          data-testid="common_login__input-email"
          onChange={ ({ target }) => setInputEmail(target.value) }
        />
      </label>
      <label htmlFor="inputPassword">
        Senha
        <input
          type="password"
          name="inputPassword"
          id="inputPassword"
          data-testid="common_login__input-password"
          onChange={ ({ target }) => setPassWord(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ !(inputEmail.match(/\S+@\S+\.\S+/i)) || (inputPassword.length < magicNumber) }
        onClick={ onClickLogin }
      >
        LOGIN
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ onClickRegister }
      >
        Ainda não tenho conta
      </button>
      <p
        data-testid="common_login__element-invalid-email"
      />
    </div>
  );
}

export default Login;
