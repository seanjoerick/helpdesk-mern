import React, { useState } from 'react';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      <div className="relative bg-blue-600">
        <span className="absolute text-white text-4xl top-5 left-4 cursor-pointer">
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
        </span>
        <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="Logo"
                className="w-8 h-8 rounded-md bg-blue-600"
              />
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">Ticketing System</h1>
              <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>

            {currentUser && (
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
                <p className="text-white text-lg font-semibold mb-2">User Information</p>
                <div className="border-t border-gray-600 py-3">
                  <span className="font-bold text-blue-400 block text-xl mb-1">
                    Role: {currentUser.roles.join(', ')}
                  </span>
                  <span className="text-gray-400 block text-sm">{currentUser.email}</span>
                </div>
              </div>
            )}

            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div>

          <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
            <i className="bi bi-search text-sm"></i>
            <input
              type="text"
              placeholder="Search"
              className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            />
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Dashboard</span>
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">User Accounts</span>
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Reports</span>
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Tickets</span>
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Settings</span>
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            <span onClick={handleLogout} className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sidebar;
