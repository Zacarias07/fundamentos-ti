import { useEffect, useState } from 'react';
import { FaUserPlus, FaSave } from 'react-icons/fa';

export default function UserForm({ onAddUser, onUpdateUser, editingUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setCpf(editingUser.cpf);
      setPhone(editingUser.phone);
      setAddress(editingUser.address);
    } else {
      setName('');
      setEmail('');
      setCpf('');
      setPhone('');
      setAddress('');
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !cpf || !phone || !address) {
      alert('Preencha todos os campos');
      return;
    }

    const user = { name, email, cpf, phone, address };

    if (editingUser) {
      onUpdateUser(user);
    } else {
      onAddUser(user);
    }

    setName('');
    setEmail('');
    setCpf('');
    setPhone('');
    setAddress('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-blue-600">
        {editingUser ? 'Editar Usuário' : 'Cadastrar Usuário'}
      </h2>

      {[
        { label: 'Nome', value: name, setValue: setName },
        { label: 'Email', value: email, setValue: setEmail },
        { label: 'CPF', value: cpf, setValue: setCpf },
        { label: 'Telefone', value: phone, setValue: setPhone },
        { label: 'Endereço', value: address, setValue: setAddress },
      ].map((field) => (
        <div key={field.label} className="flex flex-col">
          <label className="mb-1 font-medium">{field.label}:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Digite seu ${field.label.toLowerCase()}`}
            value={field.value}
            onChange={(e) => field.setValue(e.target.value)}
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
      >
        {editingUser ? (
          <>
            <FaSave /> Atualizar
          </>
        ) : (
          <>
            <FaUserPlus /> Cadastrar
          </>
        )}
      </button>
    </form>
  );
}
