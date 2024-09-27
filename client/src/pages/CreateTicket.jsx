import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import TicketModal from "../components/TicketModal";
import SuccessModal from "../components/SuccessModal";
import useGetMyTotalCompletedandCounts from "../hooks/useGetMyTotalCompletedandCounts";
import useGetMyPendingandCounts from "../hooks/useGetMyTotalPendingandCounts";
import useGetMyLastRequest from "../hooks/useGetMyLastRequest";

export default function CreateTicket() {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { completedTickets, completedCount } = useGetMyTotalCompletedandCounts();
  const { pendingTickets, pendingCount } = useGetMyPendingandCounts();
  const { lastRequest, loading: loadingLastRequest, error: lastRequestError } = useGetMyLastRequest();

  const handleSubmit = async (newTicket) => {
    try {
      const response = await fetch('/server/ticket/create-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setTickets((prevTickets) => [...prevTickets, result]);
      setShowTicketModal(false);
      setSuccessMessage('Ticket created successfully!');
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Left Column: Create Ticket and Requests */}
        <div className="md:w-1/2 flex flex-col gap-8">
          {/* Create Ticket Button */}
          <button
            onClick={() => setShowTicketModal(true)}
            className="flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white py-4 px-6 rounded-lg transition text-xl"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-4 h-8 w-8" />
            CREATE TICKET
          </button>

          {/* In Process Request and Last Request */}
          <div className="flex flex-col md:flex-row gap-8 h-full">
            {/* Last Request */}
            <div className="p-6">
              <h3 className="font-semibold mb-4 text-xl">LAST REQUEST</h3>
              {loadingLastRequest ? (
                <p>Loading...</p>
              ) : lastRequestError ? (
                <p>Error: {lastRequestError}</p>
              ) : lastRequest ? (
                <>
                  <p className="mb-2"><span className="font-semibold">Request No.:</span> {lastRequest.requestNo}</p>
                  <p className="mb-2"><span className="font-semibold">Device No.:</span> {lastRequest.comments[0].deviceNo}</p>
                  <p className="mb-2"><span className="font-semibold">Request Form:</span> {lastRequest.comments[0].formType}</p>
                  <p className="mb-2"><span className="font-semibold">Description:</span> {lastRequest.comments[0].descriptionProblem}</p>
                  <p className="mb-2"><span className="font-semibold">Date Requested:</span> {new Date(lastRequest.comments[0].createdAt).toLocaleString()}</p>

                  {/* Status Text with Color */}
                  <p className="mb-2">
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={`font-medium ${lastRequest.status === 'ongoing' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {lastRequest.status.charAt(0).toUpperCase() + lastRequest.status.slice(1).toLowerCase()}
                    </span>
                  </p>
                </>
              ) : (
                <p>No last request found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Cards */}
        <div className="md:w-1/2 flex flex-col gap-8">
          <div className="bg-[#A3C1DA] text-white p-6 rounded-lg flex-1 text-lg">
            <h2 className="text-5xl font-bold text-white">{pendingCount}</h2>
            <p className="text-md uppercase">TOTAL PENDING</p>
          </div>
          <div className="bg-[#A8E6CE] text-white p-6 rounded-lg flex-1 text-lg">
            <h2 className="text-5xl font-bold">{completedCount}</h2>
            <p className="text-md uppercase">TOTAL COMPLETED</p>
          </div>
          <div className="bg-[#FF6F61] text-white p-6 rounded-lg flex-1 text-lg">
            <h2 className="text-5xl font-bold">0</h2>
            <p className="text-md uppercase">TOTAL CONDEMNED</p>
          </div>
        </div>
      </div>

      {/* Finished Request Table */}
      <div className="bg-white rounded-lg overflow-hidden mt-8">
        <div className="p-6">
          <h3 className="font-semibold mb-6 text-xl">Finished Request</h3>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">DEVICE NO.</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">STARTED</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Action Taken</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">DATE COMPLETED</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">COMPLETED BY</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {completedTickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.comments[0]?.deviceNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.comments[0]?.updatedAt ? new Date(ticket.comments[0].updatedAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }).replace(',', '') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.action_taken}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }).replace(',', '') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.conducted_by?.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-500 hover:underline">
                      <FontAwesomeIcon icon={faSearch} className="mr-2" />
                      Search
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Ticket Modal */}
      {showTicketModal && (
        <TicketModal
          onClose={() => setShowTicketModal(false)}
          isCreateTicket={handleSubmit}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          onClose={() => setShowSuccessModal(false)}
          message={successMessage}
        />
      )}
    </div>
  );
}
