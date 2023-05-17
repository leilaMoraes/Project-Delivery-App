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
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
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
    <form
      onSubmit={ createNewUser }
      className="flex flex-wrap md:flex-row overflow-x-auto
        border-border0 border-[1px] bg-tableBg w-full px-2 pb-4 pt-1
        shadow-lg drop-shadow-md gap-2"
    >
      <div className="flex flex-wrap gap-3 p-2 ">
        <label htmlFor="name" className="w-fit flex flex-col">
          Name
          <input
            className="mt-2 border border-gray-400 bg-white
          py-3 px-4 rounded shadow w-auto"
            type="text"
            id="name"
            data-testid="admin_manage__input-name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="email" className="w-fit flex flex-col">
          Email
          <input
            className="mt-2 border border-gray-400 bg-white
            py-3 px-4 rounded shadow w-auto"
            type="email"
            id="email"
            data-testid="admin_manage__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password" className="w-fit flex flex-col">
          Password
          <input
            className="mt-2 border border-gray-400 bg-white
            py-3 px-4 rounded shadow w-auto"
            type="password"
            id="password"
            data-testid="admin_manage__input-password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <label htmlFor="role" className="w-fit flex flex-col">
          Type
          <select
            className="mt-2 border bg-white border-gray-400
          py-[14px] px-4 rounded shadow"
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
      </div>
      <button
        type="submit"
        disabled={ disabled }
        data-testid="admin_manage__button-register"
        className="bg-green-dark rounded-lg px-3.5 py-2 m-auto
          text-xl font-medium text-white
          disabled:opacity-80 disabled:cursor-not-allowed hover:bg-green-hover1 "
      >
        REGISTER

      </button>
    </form>
  );
}

export default Form;
