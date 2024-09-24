import React from 'react';
import BarChart from '../components/BarChart';
import HorizontalBarChart from '../components/HorizontalBarChart'; // Import the HorizontalBarChart

const Dashboard = () => {
  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-2"> {/* Main grid layout */}
      {/* Cards Section */}
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {/* Card 1 */}
        <div className="flex flex-col items-center justify-center p-2 bg-orange-400 text-white rounded-lg shadow-md"> {/* Decreased padding */}
          <h2 className="text-lg font-bold">Total Pending</h2>
          <p className="text-3xl">10</p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center justify-center p-2 bg-blue-500 text-white rounded-lg shadow-md"> {/* Decreased padding */}
          <h2 className="text-lg font-bold">Total Condemned</h2>
          <p className="text-3xl">3</p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center justify-center p-2 bg-green-500 text-white rounded-lg shadow-md"> {/* Decreased padding */}
          <h2 className="text-lg font-bold">Total Completed</h2>
          <p className="text-3xl">20</p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center justify-center p-2 bg-violet-500 text-white rounded-lg shadow-md"> {/* Decreased padding */}
          <h2 className="text-lg font-bold">Total Admins</h2>
          <p className="text-3xl">5</p>
        </div>
      </div>

      {/* Container for Latest Requests and BarChart */}
      <div className="flex flex-col space-y-2"> {/* Decreased space between sections */}
        {/* Latest Requests Section */}
        <div className="flex flex-col bg-gray-100 p-2 rounded-md shadow-md"> {/* Reduced padding */}
          <h2 className="text-lg font-bold">Latest Request</h2>
          <div className="mt-2 flex-grow"> {/* Reduced margin-top */}
            <p><strong>Location:</strong> Human Resources</p>
            <p><strong>Device:</strong> LAP-104</p>
            <p><strong>Date:</strong> August 10, 2024</p>
            <p><strong>Description:</strong> Connection</p>
          </div>
        </div>

        {/* Bar Chart for Service Usage */}
        <div className="flex flex-col bg-white p-2 rounded-md shadow-md"> {/* Reduced padding */}
          <h2 className="text-lg font-bold">Service Usage</h2>
          <div className="mt-2"> {/* Reduced margin-top */}
            <BarChart />
          </div>
        </div>
      </div>

      {/* Recent Activity Section - Full Width on Left Side */}
      <div className="flex flex-col bg-white p-4 rounded-md shadow-md col-span-2"> {/* Full width */}
        <h2 className="text-lg font-bold border-b pb-2 mb-4">Recent Activity</h2> {/* Underline with padding and margin */}
        <div className="mt-2 flex-grow overflow-y-auto max-h-64"> {/* Added max height and scroll */}
          <ul className="space-y-2">
            <li className="border-l-4 border-blue-500 p-2 hover:bg-blue-100 transition duration-150 ease-in-out"> {/* Improved item design */}
              <p><strong>Request #1234:</strong> Completed by John Doe</p>
            </li>
            <li className="border-l-4 border-red-500 p-2 hover:bg-red-100 transition duration-150 ease-in-out">
              <p><strong>Request #1235:</strong> Completed by Jonas</p>
            </li>
            <li className="border-l-4 border-yellow-500 p-2 hover:bg-yellow-100 transition duration-150 ease-in-out">
              <p><strong>Request #1236:</strong> Completed by Derick </p>
            </li>
            <li className="border-l-4 border-green-500 p-2 hover:bg-green-100 transition duration-150 ease-in-out">
              <p><strong>Request #1237:</strong>Completed By Ryan</p>
            </li>
            <li className="border-l-4 border-gray-500 p-2 hover:bg-gray-100 transition duration-150 ease-in-out">
              <p><strong>Request #1238:</strong> Completed By Dominic</p>
            </li>
            {/* Add more activities as needed */}
          </ul>
        </div>
      </div>

      {/* Total Monthly Requests Chart Section on Right Side */}
      <div className="flex flex-col bg-white p-2 rounded-md shadow-md">
        <h2 className="text-lg font-bold">Total Monthly Requests</h2>
        <div className="mt-2 flex-grow"> {/* Reduced margin-top */}
          <HorizontalBarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
