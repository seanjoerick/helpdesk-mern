import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar'; 
import Footer from '../components/Footer';

const MainLayout = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0" />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
        <header className="bg-gray-900 shadow p-4 mb-4 flex items-center justify-between text-gray-100">
          <div className="flex items-center">
            <div className="h-8 w-8 mr-4 bg-gray-900" /> 
            {currentUser && currentUser.roles.includes('Admin') ? (
              <h1 className="text-xl font-semibold">
                Admin View
              </h1>
            ) : (
              <h1 className="text-xl font-semibold">
                User View
              </h1>
            )}
          </div>

          {/* Real-time Date and Time */}
          <div className="text-right">
            <p>{formattedDate}</p>
            <p className="font-semibold">{formattedTime}</p>
          </div>
        </header>

        {/* Page Content (rendered by Outlet) */}
        <div className="content">
          <Outlet />
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
