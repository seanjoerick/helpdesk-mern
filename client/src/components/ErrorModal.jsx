import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorModal = ({ message, onClose }) => {
  useEffect(() => {
    // Set a timer to automatically close the modal after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-5xl mb-4" />
        <h2 className="text-xl font-bold mb-2">Error!</h2>
        <p className="text-gray-700 mb-4">{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
