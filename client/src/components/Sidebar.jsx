import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for the active link
  const [activeLink, setActiveLink] = useState('');

  const handleLogout = async () => {
    try {
      const res = await fetch('/server/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in');
      }
    } catch (error) {
      console.error('Sign-out error:', error.message);
    }
  };

  const isAdmin = currentUser?.roles.includes('Admin');
  const isUser = currentUser?.roles.includes('User');

  // Function to handle link click
  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    navigate(path); // Navigate programmatically
  };

  return (
    <div className="bg-gray-900 text-white w-72 flex-shrink-0"> {/* Increased width */}
      <div className="p-4">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 flex items-center">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="Logo"
              className="w-8 h-8 rounded-md bg-blue-600"
            />
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">Help Desk</h1>
          </div>
          
          <div className="my-2 bg-gray-600 h-[1px]"></div>

          {currentUser && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
              <p className="text-white text-lg font-semibold mb-2">User Info</p>
              <div className="border-t border-gray-600 py-3">
                <span className="font-bold text-blue-400 block text-l mb-1">
                  {currentUser.username}
                </span>
                <span className="text-gray-400 block text-sm">{currentUser.email}</span>
              </div>
            </div>
          )}

          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>

        {/* Admin-Specific Links */}
        {isAdmin && (
          <>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'dashboard' ? 'bg-blue-600' : ''}`}
              onClick={() => handleLinkClick('dashboard', '/dashboard')}
            >
              <i className="bi bi-house-door-fill"></i>
              <span className="text-[15px] ml-4">Dashboard</span>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'tickets' ? 'bg-blue-600' : ''}`}
              onClick={() => handleLinkClick('tickets', '/tickets')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <span className="text-[15px] ml-4">Tickets</span>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'accounts' ? 'bg-blue-600' : ''}`}
              onClick={() => handleLinkClick('accounts', '/accounts')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <span className="text-[15px] ml-4">Accounts</span>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'reports' ? 'bg-blue-600' : ''}`}
              onClick={() => handleLinkClick('reports', '/reports')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <span className="text-[15px] ml-4">Reports</span>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'settings' ? 'bg-blue-600' : ''}`}
              onClick={() => handleLinkClick('settings', '/settings')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <span className="text-[15px] ml-4">Settings</span>
            </div>
          </>
        )}

        {/* User-Specific Links */}
        {isUser && !isAdmin && (
          <>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'createTicket' ? 'bg-blue-600' : ''}`}
              onClick={() => handleLinkClick('createTicket', '/createticket')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <span className="text-[15px] ml-4">Create Ticket</span>
            </div>
          </>
        )}
        
        <div 
          className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'logout' ? 'bg-blue-600' : ''}`}
          onClick={() => { handleLinkClick('logout', '/'); handleLogout(); }}
        >
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="text-[15px] ml-4" role="button" aria-label="Logout">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
