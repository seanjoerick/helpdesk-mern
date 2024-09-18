import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0" />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
        {/* Header */}
        <header className="bg-white shadow p-4 mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Welcome to Help Desk</h1>
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
