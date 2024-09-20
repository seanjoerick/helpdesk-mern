import React, { useState, useEffect } from 'react';

const AccountModal = ({ isOpen, onClose, onSubmit, accountData = {}, isEditing }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [roles, setRoles] = useState('');

  useEffect(() => {
    if (isEditing && accountData) {
      setUsername(accountData.username);
      setEmail(accountData.email);
      setDepartment(accountData.department?.name || '');
      setRoles(accountData.roles.join(', '));
    }
  }, [isEditing, accountData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAccount = { username, email, department, roles: roles.split(',').map(role => role.trim()) };
    onSubmit(newAccount);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg w-1/3 z-10">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Account' : 'Add Account'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-lg w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border rounded-lg w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Roles</label>
              <input
                type="text"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                className="border rounded-lg w-full p-2"
                placeholder="Comma separated"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-600 mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2"
              >
                {isEditing ? 'Save Changes' : 'Add Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
