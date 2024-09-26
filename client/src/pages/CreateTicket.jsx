import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import TicketModal from "../components/TicketModal";
import SuccessModal from "../components/SuccessModal";

export default function CreateTicket() {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (newTicket) => {
    try {
      // Make a POST request to your server
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

          {/* In Process Request and Last Request in a row */}
          <div className="flex flex-col md:flex-row gap-8 h-full">
            {/* In Process Request */}
            <div>
              <div className="p-6">
                <h3 className="font-semibold mb-4 text-xl">IN PROCESS REQUEST</h3>
                <p className="mb-2"><span className="font-semibold">Device No.:</span> LAP-001</p>
                <p className="mb-2"><span className="font-semibold">Request Form:</span> Service Request</p>
                <p className="mb-2"><span className="font-semibold">Description:</span> Expired MS Office</p>
                <p><span className="font-semibold">Date Start:</span> March 01, 2024</p>
              </div>
            </div>

            {/* Last Request */}
            <div>
              <div className="p-6">
                <h3 className="font-semibold mb-4 text-xl">LAST REQUEST</h3>
                <p className="mb-2"><span className="font-semibold">Device No.:</span> LAP-001</p>
                <p className="mb-2"><span className="font-semibold">Request Form:</span> Service Request</p>
                <p className="mb-2"><span className="font-semibold">Description:</span> Expired MS Office</p>
                <p><span className="font-semibold">Date Requested:</span> March 01, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cards in a column */}
        <div className="md:w-1/2 flex flex-col gap-8">
          {/* Card 1 */}
          <div className="bg-[#A3C1DA] text-white p-6 rounded-lg flex-1 text-lg">
            <h2 className="text-5xl font-bold text-white">100</h2>
            <p className="text-md uppercase">TOTAL PENDING</p>
          </div>
          {/* Card 2 */}
          <div className="bg-[#FF6F61] text-white p-6 rounded-lg flex-1 text-lg">
            <h2 className="text-5xl font-bold">100</h2>
            <p className="text-md uppercase">TOTAL CONDEMNED</p>
          </div>
          {/* Card 3 */}
          <div className="bg-[#A8E6CE] text-white p-6 rounded-lg flex-1 text-lg">
            <h2 className="text-5xl font-bold">100</h2>
            <p className="text-md uppercase">TOTAL COMPLETED</p>
          </div>
        </div>
      </div>

      {/* Finished Request at the bottom, full width */}
      <div className="bg-white rounded-lg overflow-hidden mt-8">
        <div className="p-6">
          <h3 className="font-semibold mb-6 text-xl">Finished Request</h3>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">REQUEST ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">DEVICE NO.</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">STARTED</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2024-0001</td>
                <td className="px-6 py-4 whitespace-nowrap">PJG-LAP-001</td>
                <td className="px-6 py-4 whitespace-nowrap">03/30/2007</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-transparent hover:bg-gray-200 rounded-full p-2">
                    <FontAwesomeIcon icon={faSearch} className="h-6 w-6 text-gray-500" />
                  </button>
                </td>
              </tr>
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
