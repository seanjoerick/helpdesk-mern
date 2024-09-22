import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
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
              <th scope="col" className="px-6 py-4 w-1/5">User</th>
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
    </div>
  );
}
