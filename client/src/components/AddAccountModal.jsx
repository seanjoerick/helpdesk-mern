import React, { useState } from 'react';
import useDepartments from '../hooks/useDepartments';

const AddAccountModal = ({ onClose, onAddAccount }) => {
  const { departments, loading, error } = useDepartments();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAccount = {
      username,
      email,
      department,
      avatar,
    };
    onAddAccount(newAccount);
    onClose(); // Close the modal after adding the account
  };

  if (loading) return <div>Loading departments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="modal">
      <h2>Add New Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Avatar URL:</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <button type="submit">Add Account</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddAccountModal;
