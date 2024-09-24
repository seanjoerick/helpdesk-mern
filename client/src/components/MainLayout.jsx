import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import Footer from '../components/Footer';
import Header from '../components/Header'; // Import the Header component

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0" />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4 ml-72"> {/* Adjust margin as necessary */}
        
        {/* Header */}
        <Header /> {/* Added Header here */}

        {/* Page Content (rendered by Outlet) */}
        <div className="content mt-4"> {/* Add margin-top to separate from Header */}
          <Outlet />
        </div>
        
        {/* Footer */}
        <Footer />
      </div>w
    </div>
  );
};

export default MainLayout;

