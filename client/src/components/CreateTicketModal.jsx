import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";

const TicketModal = ({ isOpen, onClose }) => {
  const [deviceNo, setDeviceNo] = useState("");
  const [description, setDescription] = useState("");
  const [formType, setFormType] = useState("Service");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Device No:", deviceNo);
    console.log("Description:", description);
    console.log("Form Type:", formType);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Create Ticket</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="formType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Request Type
            </label>
            <select
              id="formType"
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="Service">Service</option>
              <option value="Web">Web</option>
              <option value="Network">Network</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="deviceNo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Device No.
            </label>
            <input
              id="deviceNo"
              type="text"
              placeholder="Enter device number"
              required
              value={deviceNo}
              onChange={(e) => setDeviceNo(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description of the problem
            </label>
            <textarea
              id="description"
              placeholder="Description here..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows={6}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
