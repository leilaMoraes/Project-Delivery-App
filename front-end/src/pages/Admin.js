import { useContext, useEffect, useState } from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import requests from '../services/requests';
import Table from '../components/Table';
import Title from '../components/Title';
import LoadAnimation from '../components/LoadAnimation';

function Admin() {
  const table = ['Item', 'Name', 'E-mail', 'Role', 'Delete'];

  const { user, token, setUsers, users } = useContext(AppContext);
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
    <div className="flex flex-col items-center h-screen">
      <Header />

      <div className="w-[95%] sm:w-5/6 mt-7 sm:mt-12 pb-3 bg-tableBg">
        <Title name="Register New User" />
        <Form />
        <Title name="Users List" />
        {loading ? <LoadAnimation /> : (
          <div
          // className="flex flex-col border shadow overflow-x-auto h-72 bg-tableBg"
            className="flex flex-col  overflow-x-auto
          border-border0 border-[1px] bg-tableBg w-full px-2 pb-2 pt-1
          shadow-lg drop-shadow-md"
          >
            <Table tableH={ table } tableB={ users } screen="admin_manage" />
          </div>
        )}
      </div>

    </div>
  );
}

export default Admin;
