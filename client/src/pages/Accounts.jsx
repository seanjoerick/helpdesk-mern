// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFolder, faEdit } from '@fortawesome/free-solid-svg-icons';
// import Pagination from '../components/Pagination';
// import useUsers from '../hooks/useUsers';
// import FilterDropdown from '../components/AccountFilterDropdown';
// import AccountModal from '../components/AccountModal';

// export default function Accounts() {
//   const { users } = useUsers();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;
//   const [selectedRole, setSelectedRole] = useState('All');
//   const [isAddModalOpen, setAddModalOpen] = useState(false);

//   // Calculate total pages
//   const totalPages = Math.ceil(users.length / itemsPerPage);
  
//   // Filter users based on selected role
//   const filteredUsers = selectedRole === 'All' 
//     ? users 
//     : users.filter(user => user.roles.includes(selectedRole));
  
//   const currentUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage, 
//     currentPage * itemsPerPage
//   );

//   // Add account
//   const handleAddAccount = () => {
//     setAddModalOpen(true);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6 border-b-2 border-blue-500 pb-2">
//         <div className="flex items-center">
//           <FontAwesomeIcon icon={faFolder} size="lg" className="text-blue-500 me-2" />
//           <h2 className="text-2xl font-bold">Manage Accounts</h2>
//         </div>

//         <div className="flex items-center space-x-2 ml-auto">
//           <FilterDropdown selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
//           <button
//             type="button"
//             onClick={handleAddAccount}
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
//           >
//             + ADD ACCOUNT
//           </button>
//         </div>
//       </div>

//       {/* Accounts Table */}
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-4 w-1/5">Username</th>
//               <th scope="col" className="px-6 py-4 w-1/5">Email Address</th>
//               <th scope="col" className="px-6 py-4 w-1/5">Department</th>
//               <th scope="col" className="px-6 py-4 w-1/5">Avatar</th>
//               <th scope="col" className="px-6 py-4 w-1/5">Roles</th>
//               <th scope="col" className="px-6 py-4 w-1/5">Status</th>
//               <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.map(user => (
//               <tr key={user._id} className="odd:bg-white even:bg-gray-50 border-b">
//                 <th scope="row" className="px-6 py-4 font-medium text-gray-900">
//                   {user.username}
//                 </th>
//                 <td className="px-6 py-4">{user.email}</td>
//                 <td className="px-6 py-4">{user.department?.name || 'N/A'}</td>
//                 <td className="px-6 py-4">
//                   <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
//                 </td>
//                 <td className="px-6 py-4">{user.roles.join(', ')}</td>
//                 <td className="px-6 py-4">
//                   <span className={`inline-block px-3 py-1 rounded-full text-white ${user.status.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleEditAccount(user)}
//                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
//                   >
//                     <FontAwesomeIcon icon={faEdit} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Pagination Controls */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// }
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEdit } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import useUsers from '../hooks/useUsers';
import FilterDropdown from '../components/AccountFilterDropdown';
import AccountModal from '../components/AccountModal';

export default function Accounts() {
  const { users } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [selectedRole, setSelectedRole] = useState('All');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Filter users based on selected role
  const filteredUsers = selectedRole === 'All' 
    ? users 
    : users.filter(user => user.roles.includes(selectedRole));

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Add account handler
  const handleAddAccount = () => {
    setIsEditing(false);   // Not in editing mode
    setSelectedUser(null); // No selected user
    setAddModalOpen(true); // Open the modal
  };

  // Edit account handler
  const handleEditAccount = (user) => {
    setSelectedUser(user); // Set selected user for editing
    setIsEditing(true);    // Switch to editing mode
    setAddModalOpen(true); // Open the modal
  };

  // Handle modal form submission
  const handleModalSubmit = (accountData) => {
    if (isEditing) {
      // Update the selected account
      console.log('Editing account:', accountData);
    } else {
      // Add a new account
      console.log('Adding new account:', accountData);
    }
    setAddModalOpen(false); // Close the modal after submission
  };

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
            onClick={handleAddAccount}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            + ADD ACCOUNT
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
            {currentUsers.map(user => (
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
                  <span className={`inline-block px-3 py-1 rounded-full text-white ${user.status.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditAccount(user)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
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

      {/* Account Modal */}
      <AccountModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleModalSubmit}
        accountData={selectedUser}
        isEditing={isEditing}
      />
    </div>
  );
}
