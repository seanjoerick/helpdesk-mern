import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0" />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
        {/* Header */}
        <header className="bg-white shadow p-4 mb-4 flex items-center">
          <img 
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" 
            alt="Help Desk Logo" 
            className="h-8 mr-4" 
          />
          <h1 className="text-xl font-semibold text-gray-800">Admin View: Manage and Monitor Support Effectively</h1>
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
