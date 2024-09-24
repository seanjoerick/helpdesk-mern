import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import useUsers from '../hooks/useUsers';
import FilterDropdown from '../components/AccountFilterDropdown';

export default function Accounts() {
  const { users, loading, error } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [selectedRole, setSelectedRole] = useState('All');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading accounts.</div>;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const filteredUsers = selectedRole === 'All' 
    ? users 
    : users.filter(user => user.roles.includes(selectedRole));

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-blue-500 pb-2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFolder} size="lg" className="text-blue-500 me-2" />
          <h2 className="text-2xl font-bold">Manage Accounts</h2>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <FilterDropdown selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            aria-label="Add Account"
          >
           <FontAwesomeIcon icon={faPlus}/> ADD ACCOUNT
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
            {currentUsers.length > 0 ? (
              currentUsers.map(user => (
                <tr key={user._id} className="odd:bg-white even:bg-gray-50 border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    {user.username}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.department?.name || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  </td>
                  <td className="px-6 py-4">{user.roles.join(', ')}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-white ${user.status.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-2 py-1">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                      aria-label={`Edit ${user.username}`}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No accounts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mb-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}









import React from 'react';
import BarChart from '../components/BarChart';
import HorizontalBarChart from '../components/HorizontalBarChart';

const Dashboard = () => {
  return (
    <div className="p-8 flex flex-col space-y-4"> {/* Main flex column layout */}
      {/* Cards Section */}
      <div className="flex flex-row justify-between space-x-2"> {/* Flex row for horizontal layout */}
        {/* Card 1 */}
        <div className="flex flex-col items-center justify-center p-2 bg-orange-400 text-white rounded-lg shadow-md h-32 w-1/4"> {/* Set width to 1/4 for uniformity */}
          <h2 className="text-lg font-bold">Total Pending</h2>
          <p className="text-3xl">100</p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center justify-center p-2 bg-blue-500 text-white rounded-lg shadow-md h-32 w-1/4">
          <h2 className="text-lg font-bold">Total Condemned</h2>
          <p className="text-3xl">100</p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center justify-center p-2 bg-green-500 text-white rounded-lg shadow-md h-32 w-1/4">
          <h2 className="text-lg font-bold">Total Completed</h2>
          <p className="text-3xl">100</p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center justify-center p-2 bg-violet-500 text-white rounded-lg shadow-md h-32 w-1/4">
          <h2 className="text-lg font-bold">Total Admins</h2>
          <p className="text-3xl">5</p>
        </div>
      </div>

      {/* Container for Latest Requests and Recent Activity */}
      <div className="flex flex-row justify-between space-x-2"> {/* Flex row for horizontal layout */}
        {/* Latest Requests Section */}
        <div className="flex flex-col bg-gray-100 p-2 rounded-md shadow-md w-1/2"> {/* Set width for responsive layout */}
          <h2 className="text-lg font-bold">Latest Request</h2>
          <div className="mt-2 flex-grow">
            <p><strong>Location:</strong> Human Resources</p>
            <p><strong>Device:</strong> LAP-104</p>
            <p><strong>Date:</strong> August 10, 2024</p>
            <p><strong>Description:</strong> Connection</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="flex flex-col bg-white p-4 rounded-md shadow-md w-1/2"> {/* Set width for responsive layout */}
          <h2 className="text-lg font-bold border-b pb-2 mb-4">Recent Activity</h2>
          <div className="mt-2 flex-grow overflow-y-auto max-h-64">
            <ul className="space-y-2">
              <li className="border-l-4 border-blue-500 p-2 hover:bg-blue-100 transition duration-150 ease-in-out">
                <p><strong>Request #1234:</strong> Completed by John Doe</p>
              </li>
              <li className="border-l-4 border-red-500 p-2 hover:bg-red-100 transition duration-150 ease-in-out">
                <p><strong>Request #1235:</strong> Condemned</p>
              </li>
              <li className="border-l-4 border-yellow-500 p-2 hover:bg-yellow-100 transition duration-150 ease-in-out">
                <p><strong>Request #1236:</strong> Pending review</p>
              </li>
              <li className="border-l-4 border-green-500 p-2 hover:bg-green-100 transition duration-150 ease-in-out">
                <p><strong>Request #1237:</strong> Approved</p>
              </li>
              <li className="border-l-4 border-gray-500 p-2 hover:bg-gray-100 transition duration-150 ease-in-out">
                <p><strong>Request #1238:</strong> Under investigation</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bar Chart for Service Usage */}
      <div className="flex flex-col bg-white p-2 rounded-md shadow-md">
        <h2 className="text-lg font-bold">Service Usage</h2>
        <div className="mt-2">
          <BarChart />
        </div>
      </div>

      {/* Total Monthly Requests Chart Section */}
      <div className="flex flex-col bg-white p-2 rounded-md shadow-md">
        <h2 className="text-lg font-bold">Total Monthly Requests</h2>
        <div className="mt-2 flex-grow">
          <HorizontalBarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;










