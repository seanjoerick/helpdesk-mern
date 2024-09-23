import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCheckToSlot, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import useTickets from '../hooks/useTickets';
import TakeActionModal from '../components/TakeActionModal';
import CompletionActionModal from '../components/CompletionActionModal';
import SuccessModal from '../components/SuccessModal';

export default function Tickets() {
  const { tickets, setTickets } = useTickets();
  const [isTakeActionModalOpen, setIsTakeActionModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false); 
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredTickets = tickets.filter(ticket =>
    ticket.status === 'pending' || ticket.status === 'ongoing' 
  );

  const handleTakeAction = async (ticketId) => {
    try {
      const res = await fetch(`/server/ticket/take-action/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ongoing' }), 
      });

      if (!res.ok) throw new Error('Network response was not ok');

      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket._id === ticketId ? { ...ticket, status: 'ongoing' } : ticket
        )
      );

      setSuccessMessage('Please fix the ticket as soon as possible!');
      setIsSuccessModalOpen(true);
      closeTakeActionModal();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleCompleteAction = async (ticketId, actionTaken, recommendation) => {
    try {
      const res = await fetch(`/server/ticket/take-action-completed/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action_taken: actionTaken, recommendation }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      setTickets(prevTickets => prevTickets.filter(ticket => ticket._id !== ticketId));
      setSuccessMessage('Ticket completed successfully!');
      setIsSuccessModalOpen(true);
      closeCompletionModal();
    } catch (error) {
      console.error('Error completing ticket:', error);
    }
  };

  const openModal = (modalType, ticket) => {
    setSelectedTicket(ticket);
    if (modalType === 'take') {
      setIsTakeActionModalOpen(true);
    } else {
      setIsCompletionModalOpen(true);
    }
  };

  const closeTakeActionModal = () => setIsTakeActionModalOpen(false);
  const closeCompletionModal = () => setIsCompletionModalOpen(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-blue-500 pb-2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFolder} size="lg" className="text-blue-500 me-2" />
          <h2 className="text-2xl font-bold">Manage Tickets</h2>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-4">Request No</th>
              <th className="px-6 py-4">FORM</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Requested By</th>
              <th className="px-6 py-4">Device No</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Received Time</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => (
                <tr key={ticket._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
                  <td className="px-6 py-4 font-medium text-gray-900">{ticket.requestNo}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{ticket.comments.length > 0 ? ticket.comments[0].formType : 'N/A'}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{ticket.comments.length > 0 ? ticket.comments[0].user?.department.name : 'N/A'}</td>
                  <td className="px-6 py-4">{ticket.comments.length > 0 ? ticket.comments[0].user?.username : 'N/A'}</td>
                  <td className="px-6 py-4">{ticket.comments.length > 0 ? ticket.comments[0].deviceNo : 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-white ${ticket.status === 'ongoing' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(ticket.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className={`text-white ${ticket.status === 'ongoing' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5`}
                        onClick={() => openModal('take', ticket)}
                        title="Take Action"
                        disabled={ticket.status === 'ongoing'}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>

                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={() => openModal('complete', ticket)}
                        title="Complete"
                      >
                        <FontAwesomeIcon icon={faCheckToSlot} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">No tickets available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isTakeActionModalOpen && (
        <TakeActionModal
          ticket={selectedTicket}
          onClose={closeTakeActionModal}
          onTakeAction={handleTakeAction}
        />
      )}

      {isCompletionModalOpen && (
        <CompletionActionModal
          ticket={selectedTicket}
          onClose={closeCompletionModal}
          onCompleteAction={handleCompleteAction} 
        />
      )}

      {isSuccessModalOpen && (
        <SuccessModal
          message={successMessage}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </div>
  );
}
