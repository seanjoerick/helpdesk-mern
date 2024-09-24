import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate, Link } from 'react-router-dom';

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
  const handleLinkClick = (link) => {
    setActiveLink(link);
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
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'dashboard' ? 'bg-blue-600' : 'hover:bg-blue-600'}`} // Active background
              onClick={() => handleLinkClick('dashboard')}
            >
              <i className="bi bi-house-door-fill"></i>
              <Link to="/dashboard" className="text-[15px] ml-4">Dashboard</Link>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'tickets' ? 'bg-blue-600' : 'hover:bg-blue-600'}`} // Active background
              onClick={() => handleLinkClick('tickets')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <Link to="/tickets" className="text-[15px] ml-4">Tickets</Link>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'accounts' ? 'bg-blue-600' : 'hover:bg-blue-600'}`} // Active background
              onClick={() => handleLinkClick('accounts')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <Link to="/accounts" className="text-[15px] ml-4">Accounts</Link>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'reports' ? 'bg-blue-600' : 'hover:bg-blue-600'}`} // Active background
              onClick={() => handleLinkClick('reports')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <Link to="/reports" className="text-[15px] ml-4">Reports</Link>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-600'}`} // Active background
              onClick={() => handleLinkClick('settings')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <Link to="/settings" className="text-[15px] ml-4">Settings</Link>
            </div>
          </>
        )}

        {/* User-Specific Links */}
        {isUser && !isAdmin && (
          <>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'createTicket' ? 'bg-blue-600' : 'hover:bg-blue-600'}`} // Active background
              onClick={() => handleLinkClick('createTicket')}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <Link to="/createticket" className="text-[15px] ml-4">Create Ticket</Link>
            </div>
          </>
        )}
        
        <div 
          className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'logout' ? 'bg-blue-600' : 'hover:bg-blue-600'}`} // Active background
          onClick={() => { handleLinkClick('logout'); handleLogout(); }}
        >
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="text-[15px] ml-4" role="button" aria-label="Logout">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
