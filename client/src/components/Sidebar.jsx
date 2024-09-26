import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faTicketAlt, faUserFriends, faChartPie, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    // Determine the default active link based on user role
    const storedActiveLink = localStorage.getItem('activeLink');
    
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    } else if (currentUser?.roles.includes('Admin')) {
      setActiveLink('dashboard');
      localStorage.setItem('activeLink', 'dashboard');
      navigate('/dashboard'); 
    } else if (currentUser?.roles.includes('User')) {
      setActiveLink('createTicket');
      localStorage.setItem('activeLink', 'createTicket');
      navigate('/createticket');  
    }
  }, [currentUser, navigate]);

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
        localStorage.removeItem('activeLink'); 
        navigate('/sign-in');
      }
    } catch (error) {
      console.error('Sign-out error:', error.message);
    }
  };

  const isAdmin = currentUser?.roles.includes('Admin');
  const isUser = currentUser?.roles.includes('User');

  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    localStorage.setItem('activeLink', link); 
    navigate(path);
  };

  return (
    <div className="fixed top-0 left-0 h-full bg-gray-900 text-white w-72 flex-shrink-0 overflow-y-auto"> {/* Set position fixed */}
      <div className="p-4">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 flex items-center">
            <div className="w-8 h-8 rounded-md bg-blue-600" />
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
              <FontAwesomeIcon icon={faHouseUser} />
              <span className="text-[15px] ml-4">Dashboard</span>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'tickets' ? 'bg-blue-600' : ''}`}
              onClick={() => handleLinkClick('tickets', '/tickets')}
            >
              <FontAwesomeIcon icon={faTicketAlt} />
              <span className="text-[15px] ml-4">Tickets</span>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'accounts' ? 'bg-blue-600' : ''}`}
              onClick={() => handleLinkClick('accounts', '/accounts')}
            >
              <FontAwesomeIcon icon={faUserFriends} />
              <span className="text-[15px] ml-4">Accounts</span>
            </div>
            <div 
              className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer ${activeLink === 'reports' ? 'bg-blue-600' : ''}`}
              onClick={() => handleLinkClick('reports', '/reports')}
            >
              <FontAwesomeIcon icon={faChartPie} />
              <span className="text-[15px] ml-4">Reports</span>
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
              <FontAwesomeIcon icon={faTicketAlt} />
              <span className="text-[15px] ml-4">Ticket</span>
            </div>
          </>
        )}
        
        <div 
          className={`p-3 mt-3 flex items-center rounded-md duration-300 cursor-pointer`}
          onClick={handleLogout} 
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="text-[15px] ml-4" role="button" aria-label="Logout">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
