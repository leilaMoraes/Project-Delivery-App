import { useContext, useEffect, useState } from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import requests from '../services/requests';
import Table from '../components/Table';

function Admin() {
  const { message, user, token, setUsers } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const headers = { headers: { authorization: token } };
        await requests.getUsers(headers)
          .then(({ data }) => setUsers(data.filter((u) => u.id !== Number(user.id))))
          .finally(() => setLoading(false));
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getUsers();
  }, []);
  return (
    <div>
      <Header />
      <h3 className="mt-12">Register New User</h3>
      {message && (
        <p
          data-testid="admin_manage__element-invalid-register"
        >
          {message}
        </p>
      )}
      <Form />
      <h3>Users List</h3>
      {loading ? <p>Loading...</p> : (<Table />)}
    </div>
  );
}

export default Admin;
