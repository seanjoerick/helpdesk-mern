import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faSearch } from '@fortawesome/free-solid-svg-icons';
import useTickets from '../hooks/useTickets';
import Pagination from '../components/Pagination';

export default function Tickets() {
    const { tickets, setTickets } = useTickets();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const [searchTerm, setSearchTerm] = useState('');

    // Filter tickets based on search term and status
    const filteredTickets = tickets.filter(ticket =>
        (ticket.status === 'completed') &&
        (ticket.requestNo.includes(searchTerm) ||
            ticket.comments?.some(comment =>
                comment.deviceNo.includes(searchTerm) ||
                (comment.user?.username && comment.user.username.includes(searchTerm)) ||
                (comment.user?.department?.name && comment.user.department.name.includes(searchTerm)) ||
                (comment.descriptionProblem && comment.descriptionProblem.includes(searchTerm))
            ))
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
                    <h2 className="text-2xl font-bold">Reports</h2>
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

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-4">Request No</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Requested By</th>
                            <th className="px-6 py-4">Device No</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Received Time</th>
                            <th className="px-6 py-4">Date Completed</th>
                            <th className="px-6 py-4">Conducted By</th>
                            <th className="px-6 py-4">Action Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTickets.length > 0 ? (
                            currentTickets.map((ticket, index) => (
                                <tr key={ticket._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
                                    <td className="px-6 py-4 font-medium text-gray-900">{ticket.requestNo}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {ticket.comments.length > 0 ? ticket.comments[0].user?.department?.name : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">{ticket.comments.length > 0 ? ticket.comments[0].user?.username : 'N/A'}</td>
                                    <td className="px-6 py-4">{ticket.comments.length > 0 ? ticket.comments[0].deviceNo : 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        {/* Status Text with Color */}
                                        <span className={`font-medium ${ticket.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).toLowerCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(ticket.comments[0]?.createdAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long', 
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        }).replace(',', '')} 
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(ticket.comments[0]?.updatedAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long', 
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        }).replace(',', '')} 
                                    </td>
                                    <td className="px-6 py-4">{ticket.conducted_by?.username}</td>
                                    <td className="px-6 py-4">{ticket.action_taken}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="px-6 py-4 text-center">No tickets available.</td>
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
