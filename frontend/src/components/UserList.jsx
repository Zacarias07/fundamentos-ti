import { FaEdit, FaTrash, FaEnvelope, FaIdCard, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function UserList({ users, onDelete, onEdit }) {
  if (users.length === 0) {
    return <p className="text-center text-gray-500">Nenhum usuário cadastrado.</p>;
  }

  const handleDelete = (index) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este usuário?');
    if (confirm) {
      onDelete(index);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Usuários Cadastrados:</h2>
      <ul className="flex flex-col gap-4">
        {users.map((user, index) => (
          <li
            key={index}
            className="bg-white rounded-xl p-5 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="space-y-1">
              <p className="text-lg font-bold text-blue-700">{user.name}</p>
              <p className="flex items-center gap-2 text-gray-600">
                <FaEnvelope /> {user.email}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <FaIdCard /> CPF: {user.cpf}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <FaPhone /> Tel: {user.phone}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt /> Endereço: {user.address}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                onClick={() => onEdit(index)}
              >
                <FaEdit /> Editar
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                onClick={() => handleDelete(index)}
              >
                <FaTrash /> Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
