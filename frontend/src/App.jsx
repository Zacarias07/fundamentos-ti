import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

export default function App() {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
    setEditingIndex(null);
  };

  const editUser = (index) => {
    setEditingIndex(index);
  };

  const updateUser = (updatedUser) => {
    const newUsers = [...users];
    newUsers[editingIndex] = updatedUser;
    setUsers(newUsers);
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Cadastro de Usuários
        </h1>

        <UserForm
          onAddUser={addUser}
          onUpdateUser={updateUser}
          editingUser={editingIndex !== null ? users[editingIndex] : null}
        />

        <UserList
          users={users}
          onDelete={deleteUser}
          onEdit={editUser}
        />
      </div>
    </div>
  );
}
