import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TakeActionModal = ({ ticket, onClose, onTakeAction }) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-[550px] max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              TICKET DETAILS
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>REQUESTED BY:</strong> {ticket.comments.length > 0 ? ticket.comments[0].user.username : 'N/A'}
              </div>
              <div>
                <strong>LOCATION:</strong> {ticket.comments.length > 0 ? ticket.comments[0].user.department.name : 'N/A'}
              </div>
              <div>
                <strong>FORM:</strong> {ticket.comments.length > 0 ? ticket.comments[0].formType : 'N/A'}
              </div>
              <div>
                <strong>DEVICE NO:</strong> {ticket.comments.length > 0 ? ticket.comments[0].deviceNo : 'N/A'}
              </div>
              {/* Description in the middle spanning both columns */}
              <div className="md:col-span-2">
                <strong>DESCRIPTION:</strong> {ticket.comments.length > 0 ? ticket.comments[0].descriptionProblem : 'N/A'}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
              <button
                onClick={() => onTakeAction(ticket._id)}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Take Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeActionModal;
