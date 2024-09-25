import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SuccessModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl mb-4" />
        <h2 className="text-xl font-bold mb-2">Success!</h2>
        <p className="text-gray-700 mb-4">{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal;
