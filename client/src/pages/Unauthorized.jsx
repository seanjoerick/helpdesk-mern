import React from 'react';
import { useSelector } from 'react-redux';

const Unauthorized = () => {
  const { currentUser } = useSelector(state => state.user);

  const redirectLink = currentUser && currentUser.roles.includes('Admin') ? '/dashboard' : '/createticket';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-semibold text-red-600">Unauthorized</h1>
        <p className="mt-4 text-gray-600">You do not have permission to view this page.</p>
        <a 
          href={redirectLink} 
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Go to {currentUser && currentUser.roles.includes('Admin') ? 'Dashboard' : 'Create Ticket'}
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
