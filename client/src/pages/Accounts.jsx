import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import useUsers from '../hooks/useUsers';

export default function Accounts() {
  const { users } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('All');

  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Get current users to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // Filter users based on selected role
  const filteredUsers = selectedRole === 'All' ? users : users.filter(user => user.roles.includes(selectedRole));
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  // Handle role selection from dropdown
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setDropdownOpen(false); 
  };

  return (
    <div className="p-6">
      {/* Header Section with border, icon, and + Add Account button */}
      <div className="flex items-center justify-between mb-6 border-b-2 border-blue-500 pb-2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFolder} size="lg" className="text-blue-500 me-2" />
          <h2 className="text-2xl font-bold">Manage Accounts</h2>
        </div>

        {/* Buttons Container */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {selectedRole} {/* Display the selected role */}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div id="dropdown" className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <button 
                      onClick={() => handleRoleSelect('All')} 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleRoleSelect('Admin')} 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Admin
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleRoleSelect('User')} 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      User
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* + Add Account Button */}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            + Add Account
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4 w-1/5">Username</th>
              <th scope="col" className="px-6 py-4 w-1/5">Email Address</th>
              <th scope="col" className="px-6 py-4 w-1/5">Department</th>
              <th scope="col" className="px-6 py-4 w-1/5">Avatar</th>
              <th scope="col" className="px-6 py-4 w-1/5">Roles</th>
              <th scope="col" className="px-6 py-4 w-1/5">Status</th>
              <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.department?.name || 'N/A'}</td>
                <td className="px-6 py-4">
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                </td>
                <td className="px-6 py-4">{user.roles.join(', ')}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white ${
                      user.status.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
