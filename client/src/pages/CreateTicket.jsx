import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function CreateTicket() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button className="flex items-center justify-center bg-teal-400 hover:bg-teal-500 text-white py-2 px-4 rounded-lg transition">
          <FontAwesomeIcon icon={faPlus} className="mr-2 h-6 w-6" />
          CREATE TICKET
        </button>
        <div className="bg-[#A3C1DA] p-4 rounded-lg">
          <h2 className="text-4xl font-bold">100</h2>
          <p className="text-sm uppercase">TOTAL PENDING</p>
        </div>
        <div className="bg-[#FF6F61] text-white p-4 rounded-lg">
          <h2 className="text-4xl font-bold">100</h2>
          <p className="text-sm uppercase">TOTAL CONDEMNED</p>
        </div>
        <div className="bg-[#A3C1DA] text-white p-4 rounded-lg">
          <h2 className="text-4xl font-bold">100</h2>
          <p className="text-sm uppercase">TOTAL COMPLETED</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h3 className="font-semibold mb-2">IN PROCESS REQUEST</h3>
            <p><span className="font-semibold">Device No.:</span> LAP-001</p>
            <p><span className="font-semibold">Request Form:</span> Service Request</p>
            <p><span className="font-semibold">Description:</span> Expired MS Office</p>
            <p><span className="font-semibold">Date Start:</span> March 01, 2024</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h3 className="font-semibold mb-2">LAST REQUEST</h3>
            <p><span className="font-semibold">Device No.:</span> LAP-001</p>
            <p><span className="font-semibold">Request Form:</span> Service Request</p>
            <p><span className="font-semibold">Description:</span> Expired MS Office</p>
            <p><span className="font-semibold">Date Requested:</span> March 01, 2024</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h3 className="font-semibold mb-4">Finished Request</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">REQUEST ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEVICE NO.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STARTED</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2024-0001</td>
                <td className="px-6 py-4 whitespace-nowrap">PJG-LAP-001</td>
                <td className="px-6 py-4 whitespace-nowrap">03/30/2007</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-transparent hover:bg-gray-200 rounded-full p-2">
                    <FontAwesomeIcon icon={faSearch} className="h-6 w-6 text-gray-500" /> {/* Increased icon size */}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
