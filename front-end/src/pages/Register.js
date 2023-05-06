import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const magicPassword = 6;
  const magicName = 12;

  return (
    <div>
      <h1>Register</h1>
      <Input
        label="Nome"
        type="text"
        inputName="inputName"
        id="inputName"
        value={ name }
        dataName="common_register__input-name"
        onChange={ ({ target }) => setName(target.value) }
      />
      {name !== ''
      && name.length < magicName && <p>Name must be 12 characters</p>}
      <Input
        label="Email"
        type="text"
        inputName="inputEmail"
        id="inputEmail"
        value={ email }
        dataName="common_register__input-email"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      {email !== ''
      && !(email.match(/\S+@\S+\.\S+/i)) && <p>Invalid Email</p>}
      <Input
        label="Senha"
        type="password"
        inputName="inputPassword"
        id="inputPassword"
        value={ password }
        dataName="common_register__input-password"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      {password !== ''
      && password.length < magicPassword && <p>Password must be 6 characters</p>}
      <Button
        dataName="common_register__button-register"
        disabled={ !(email.match(/\S+@\S+\.\S+/i)) || (password.length < magicPassword) || (name.length < magicName) }
        btnName="CADASTRAR"
      />
      <p
        data-testid="common_register__element-invalid_register"
      />
    </div>
  );
}

export default Register;
