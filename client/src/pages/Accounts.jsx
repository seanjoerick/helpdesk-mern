import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faFolder } from '@fortawesome/free-solid-svg-icons';

export default function Accounts() {
  const [activeTab, setActiveTab] = useState('Co-admins'); // Default to Co-admins

  // Dummy data for users, co-admins, and accounts
  const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com', username: 'user1' },
    { id: 2, name: 'User 2', email: 'user2@example.com', username: 'user2' },
  ];

  const coAdmins = [
    { id: 1, name: 'Co-admin 1', email: 'coadmin1@example.com', username: 'coadmin1' },
    { id: 2, name: 'Co-admin 2', email: 'coadmin2@example.com', username: 'coadmin2' },
  ];

  const accounts = [
    { id: 1, name: 'Co-admin 1', email: 'coadmin1@example.com', username: 'coadmin1' },
    { id: 2, name: 'Co-admin 2', email: 'coadmin2@example.com', username: 'coadmin2' },
    { id: 3, name: 'User 1', email: 'user12@example.com', username: 'user1' },
  ];

  const handleEdit = (id) => {
    // Handle edit functionality here
    console.log(`Edit item with id ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete functionality here
    console.log(`Delete item with id ${id}`);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Accounts</h2>
      </div>

      {/* Tabs with "+ Add Account" button aligned to the right */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-6">
          <div
            className={`cursor-pointer py-2 px-8 text-xl font-medium ${
              activeTab === 'Co-admins' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('Co-admins')}
          >
            <FontAwesomeIcon icon={faUserTie} size="sm" /> CO-ADMINS
          </div>

          <div
            className={`cursor-pointer py-2 px-8 text-xl font-medium ${
              activeTab === 'Users' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('Users')}
          >
            <FontAwesomeIcon icon={faUser} size="sm" /> USERS
          </div>

          <div
            className={`cursor-pointer py-2 px-8 text-xl font-medium ${
              activeTab === 'Accounts' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('Accounts')}
          >
            <FontAwesomeIcon icon={faFolder} size="sm" /> ACCOUNTS
          </div>
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          + ADD ACCOUNT
        </button>
      </div>

      {/* Conditional Rendering of Tables */}
      {activeTab === 'Co-admins' && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4 w-1/4">Name</th>
                <th scope="col" className="px-6 py-4 w-1/4">Username</th>
                <th scope="col" className="px-6 py-4 w-1/4">Email</th>
                <th scope="col" className="px-6 py-4 w-1/4">Password</th>
                <th scope="col" className="px-6 py-4 w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coAdmins.map(coAdmin => (
                <tr key={coAdmin.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{coAdmin.name}</th>
                  <td className="px-6 py-4">{coAdmin.username}</td>
                  <td className="px-6 py-4">{coAdmin.email}</td>
                  <td className="px-6 py-4">••••••••</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(coAdmin.id)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(coAdmin.id)}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Users' && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4 w-1/4">Name</th>
                <th scope="col" className="px-6 py-4 w-1/4">Username</th>
                <th scope="col" className="px-6 py-4 w-1/4">Email</th>
                <th scope="col" className="px-6 py-4 w-1/4">Password</th>
                <th scope="col" className="px-6 py-4 w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">••••••••</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Accounts' && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4 w-1/4">Name</th>
                <th scope="col" className="px-6 py-4 w-1/4">Username</th>
                <th scope="col" className="px-6 py-4 w-1/4">Email</th>
                <th scope="col" className="px-6 py-4 w-1/4">Password</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{account.name}</th>
                  <td className="px-6 py-4">{account.username}</td>
                  <td className="px-6 py-4">{account.email}</td>
                  <td className="px-6 py-4">••••••••</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


