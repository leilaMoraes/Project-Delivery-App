import React from 'react';

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <label htmlFor="inputName">
        Nome
        <input
          type="text"
          name="inputName"
          id="inputName"
          data-testid="common_register__input-name"
        />
      </label>
      <label htmlFor="inputEmail">
        Email
        <input
          type="text"
          name="inputEmail"
          id="inputEmail"
          data-testid="common_register__input-email"
        />
      </label>
      <label htmlFor="inputPassword">
        Senha
        <input
          type="password"
          name="inputPassword"
          id="inputPassword"
          data-testid="common_register__input-password"
        />
      </label>
      <button
        type="button"
        data-testid="common_register__button-register"
      >
        CADASTRAR
      </button>
      <p
        data-testid="common_register__element-invalid_register"
      />
    </div>
  );
}

export default Register;
