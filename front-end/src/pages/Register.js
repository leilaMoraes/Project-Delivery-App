import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <Input
        label="Nome"
        type="text"
        inputName="inputName"
        id="inputName"
        dataName="common_register__input-name"
      />
      <Input
        label="Email"
        type="text"
        inputName="inputEmail"
        id="inputEmail"
        dataName="common_register__input-email"
      />
      <Input
        label="Senha"
        type="password"
        inputName="inputPassword"
        id="inputPassword"
        dataName="common_register__input-password"
      />
      <Button
        dataName="common_register__button-register"
        btnName="CADASTRAR"
      />
      <p
        data-testid="common_register__element-invalid_register"
      />
    </div>
  );
}

export default Register;
