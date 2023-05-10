import { useContext, useEffect, useState } from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import requests from '../services/requests';
import Table from '../components/Table';
import Title from '../components/Title';

function Admin() {
  const table = ['Item', 'Name', 'E-mail', 'Role', 'Delete'];

  const { message, user, token, setUsers, users } = useContext(AppContext);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col items-center h-screen">
      <Header />
      <div className="w-5/6 mt-12">
        <Title name="Register New User" />
        <Form />
      </div>
      {message && (
        <p
          className="mt-10 mb-5"
          data-testid="admin_manage__element-invalid-register"
        >
          {message}
        </p>
      )}
      <div className="w-5/6">
        <Title name="Users List" />
        <div
          className="flex flex-col border shadow overflow-x-auto h-72"
        >
          {loading ? <p>Loading...</p> : (
            <Table tableH={ table } tableB={ users } screen="admin_manage" />)}
        </div>
      </div>
    </div>
  );
}

export default Admin;
