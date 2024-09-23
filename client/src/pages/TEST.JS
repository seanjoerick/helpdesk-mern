//Trash button
 <button
className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
>
<FontAwesomeIcon icon={faTrash} />
</button>
  

//Filtering button 
  <div className="relative">
  <button
    id="dropdownDefaultButton"
    onClick={toggleDropdown}
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
  >
    {selectedRole} {/* Directly show the selected role */}
    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
    </svg>
  </button>

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












//manageTICKETS UI
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faSearch, faCheckToSlot} from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import useTickets from '../hooks/useTickets';

export default function Tickets() {
  const { tickets } = useTickets();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tickets based on search term and status
  const filteredTickets = tickets.filter(ticket => 
    ticket.status.toLowerCase() === 'pending' &&
    (ticket.requestNo.includes(searchTerm) || 
     ticket.comments.some(comment => comment.deviceNo.includes(searchTerm)))
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  // Get current tickets for the current page
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-blue-500 pb-2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFolder} size="lg" className="text-blue-500 me-2" />
          <h2 className="text-2xl font-bold">Manage Tickets</h2>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Search Button */}
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded">
            <FontAwesomeIcon icon={faSearch} className="me-2" />
            Search
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 w-1/5">Request no</th>
              <th scope="col" className="px-6 py-4 w-1/5">Username</th>
              <th scope="col" className="px-6 py-4 w-1/5">Device no</th>
              <th scope="col" className="px-6 py-4 w-1/5">Status</th>
              <th scope="col" className="px-6 py-4 w-1/5">Received</th>
              <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket, index) => (
              <tr key={ticket._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
                
                {/* Request No */}
                <td className="px-6 py-4 font-medium text-gray-900">{ticket.requestNo}</td>

                {/* User */}
                <td className="px-6 py-4">
                {ticket.comments[0]?.user || 'N/A'}</td> {/* Display "User" as a placeholder */}
                {/* Device No */}
                <td className="px-6 py-4">{ticket.comments[0]?.deviceNo || 'N/A'}</td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 rounded-full text-white bg-yellow-500">
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).toLowerCase()}
                  </span>
                </td>

                {/* Received (createdAt) */}
                <td className="px-6 py-4">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                  <FontAwesomeIcon icon={faCheckToSlot} />
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
    </div>
  );
}





new ticket 



import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import useTickets from '../hooks/useTickets';

export default function Tickets() {
  const { tickets } = useTickets();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter tickets based on pending status
  const filteredTickets = tickets.filter(ticket => ticket.status === 'pending');

  // Calculate total pages
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  // Get current tickets for the current page
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-blue-500 pb-2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFolder} size="lg" className="text-blue-500 me-2" />
          <h2 className="text-2xl font-bold">Manage Tickets</h2>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 w-1/5">Request no</th>
              <th scope="col" className="px-6 py-4 w-1/5">Username</th>
              <th scope="col" className="px-6 py-4 w-1/5">Device no</th>
              <th scope="col" className="px-6 py-4 w-1/5">Status</th>
              <th scope="col" className="px-6 py-4 w-1/5">Received and Time</th>
              <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.length > 0 ? (
              currentTickets.map((ticket, index) => (
                <tr
                  key={ticket._id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}
                >
                  {/* Request No */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {ticket.requestNo}
                  </td>

                  {/* User */}
                  <td className="px-6 py-4">
                    {ticket.comments.length > 0 && ticket.comments[0]?.user
                      ? ticket.comments[0].user
                      : 'N/A'}
                  </td>

                  {/* Device No */}
                  <td className="px-6 py-4">
                    {ticket.comments.length > 0 && ticket.comments[0]?.deviceNo
                      ? ticket.comments[0].deviceNo
                      : 'N/A'}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-white bg-yellow-500">
                      {ticket.status.charAt(0).toUpperCase() +
                        ticket.status.slice(1).toLowerCase()}
                    </span>
                  </td>

                  {/* Received (createdAt) */}
                  <td className="px-6 py-4">
                    {new Date(ticket.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                      <FontAwesomeIcon icon={faCheckToSlot} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No tickets available.
                </td>
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




