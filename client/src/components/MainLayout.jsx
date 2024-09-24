import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar'; 
import Footer from '../components/Footer';

const MainLayout = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0" />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
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
