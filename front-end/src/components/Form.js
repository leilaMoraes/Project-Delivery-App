import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AppContext from '../context/AppContext';
import requests from '../services/requests';

function Form() {
  const { setMessage, token, setUsers } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const isEmailValid = regex.test(email);
    const FIVE = 5;
    const ELEVEN = 11;
    setDisabled(!(isEmailValid && password.length > FIVE && name.length > ELEVEN));
  }, [email, name, password, role]);
  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('seller');
  };
  const createNewUser = async (e) => {
    e.preventDefault();
    try {
      const headers = { headers: { authorization: token } };
      const response = await requests
        .postUser({ name, email, password, role }, headers);
      setUsers((prev) => prev.concat(response.data));
      toast.success('New user successfully registered!');
      // setMessage('New user successfully registered!');
      clearInputs();
    } catch (error) {
      setMessage(error.response.data.message);
      toast.error(error.response.data.message);
      clearInputs();
    }
  };
  return (
    <form onSubmit={ createNewUser }>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          data-testid="admin_manage__input-name"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          data-testid="admin_manage__input-email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          data-testid="admin_manage__input-password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <label htmlFor="role">
        Type
        <select
          id="role"
          value={ role }
          onChange={ ({ target }) => setRole(target.value) }
          data-testid="admin_manage__select-role"
        >
          <option value="seller">Seller</option>
          <option value="customer">Customer</option>
          <option value="administrator">Administrator</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={ disabled }
        data-testid="admin_manage__button-register"
      >
        Register

      </button>
    </form>
  );
}

export default Form;
