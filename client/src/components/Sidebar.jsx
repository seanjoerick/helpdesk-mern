// import React, { useState } from 'react';
// import Footer from './Footer';
// import { useDispatch, useSelector } from 'react-redux';
// import { signoutSuccess } from '../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';


// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const handleSidebarToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   const { currentUser } = useSelector(state => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const res = await fetch('/server/user/signout', {
//         method: 'POST',
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.error(data.message); 
//       } else {
//         dispatch(signoutSuccess());
//         navigate('/sign-in');
//       }
//     } catch (error) {
//       console.error('Sign-out error:', error.message); 
//     }
//   };

//   return (
//     <>
//       <div className={`relative bg-blue-600 ${isSidebarOpen ? '' : 'hidden'}`}>
//         <span className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
//           onClick={handleSidebarToggle}>
//           <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
//         </span>
//         <div className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${isSidebarOpen ? '' : 'hidden'}`}>
//           <div className="text-gray-100 text-xl">
//             <div className="p-2.5 mt-1 flex items-center">
//             <img
//                 src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
//                 alt="Logo"
//                 className="w-8 h-8 rounded-md bg-blue-600"
//               />
//               <h1 className="font-bold text-gray-200 text-[15px] ml-3">Ticketing System</h1>
//               <i
//                 className="bi bi-x cursor-pointer ml-28 lg:hidden"
//                 onClick={handleSidebarToggle}
//               ></i>
//             </div>
//             <div className="my-2 bg-gray-600 h-[1px]"></div>
//           </div>
//           <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
//             <i className="bi bi-search text-sm"></i>
//             <input
//               type="text"
//               placeholder="Search"
//               className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
//             />
//           </div>
//           <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//             <i className="bi bi-house-door-fill"></i>
//             <span className="text-[15px] ml-4 text-gray-200 font-bold">Dashboard</span>
//           </div>
//           <div className="my-4 bg-gray-600 h-[1px]"></div>

//           <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//             <i className="bi bi-box-arrow-in-right"></i>
//             <span className="text-[15px] ml-4 text-gray-200 font-bold">User Accounts</span>
//           </div>

//           <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//             <i className="bi bi-box-arrow-in-right"></i>
//             <span className="text-[15px] ml-4 text-gray-200 font-bold">Reports</span>
//           </div>

//           <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//             <i className="bi bi-box-arrow-in-right"></i>
//             <span className="text-[15px] ml-4 text-gray-200 font-bold">Tickets</span>
//           </div>

//           <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//             <i className="bi bi-box-arrow-in-right"></i>
//             <span className="text-[15px] ml-4 text-gray-200 font-bold">Settings</span>
//           </div>

//           <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
//             <i className="bi bi-box-arrow-in-right"></i>
//             <span onClick={handleLogout} className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
//           </div>

//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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
      <div className={`relative bg-blue-600 ${isSidebarOpen ? '' : 'hidden'}`}>
        <span className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
          onClick={handleSidebarToggle}>
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
        </span>
        <div className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${isSidebarOpen ? '' : 'hidden'}`}>
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="Logo"
                className="w-8 h-8 rounded-md bg-blue-600"
              />
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">Ticketing System</h1>
              <div className="my-2 bg-gray-600 h-[1px]"></div>
              <i className="bi bi-x cursor-pointer ml-28 lg:hidden" onClick={handleSidebarToggle}></i>
            </div>
            
            {currentUser && (
             <p className="text-gray-300 mt-2 border border-gray-500 p-2 rounded-md text-center">
             <span className="font-bold block">Role: {currentUser.roles.join(', ')}</span>
             <span className="font-bold block">{currentUser.email}</span>
            </p>
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
