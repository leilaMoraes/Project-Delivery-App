import { toast } from 'react-toastify';
import { useContext } from 'react';
import requests from '../services/requests';
import AppContext from '../context/AppContext';

function Table() {
  const { setMessage, token, users, setUsers } = useContext(AppContext);
  const deleteUser = async (id) => {
    try {
      const headers = { headers: { authorization: token } };
      await requests.deleteUser(id, headers);
      setUsers(users.filter((user) => user.id !== id));
      toast.success('User deleted successfully');
      setMessage('User deleted successfully');
    } catch (error) {
      setMessage(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <table style={{ width: '100%', border: '1px solid black', textAlign: 'center' }}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Role</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, email, role }, index) => (
          <tr key={id}>
            <td
              data-testid={`admin_manage__element-user-table-item-number-${index}`}
            >
              {index + 1}

            </td>
            <td
              data-testid={`admin_manage__element-user-table-name-${index}`}
            >
              {name}

            </td>
            <td
              data-testid={`admin_manage__element-user-table-email-${index}`}
            >
              {email}

            </td>
            <td
              data-testid={`admin_manage__element-user-table-role-${index}`}
            >
              {role}

            </td>
            <td>
              <button
                type="button"
                data-testid={`admin_manage__element-user-table-remove-${index}`}
                onClick={() => deleteUser(id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
