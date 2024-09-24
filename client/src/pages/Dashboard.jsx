import React from 'react';
import BarChart from '../components/BarChart';
import HorizontalBarChart from '../components/HorizontalBarChart';

const Dashboard = () => {
  // Sample data for recent activities
  const recentActivities = [
    { id: '#1234', status: 'Completed', completedBy: 'John Doe', date: 'August 10, 2024' },
    { id: '#1235', status: 'Completed', completedBy: 'Jonas', date: 'August 11, 2024' },
    { id: '#1236', status: 'Completed', completedBy: 'Derick', date: 'August 12, 2024' },
    { id: '#1237', status: 'Completed', completedBy: 'Ryan', date: 'August 13, 2024' },
    { id: '#1238', status: 'Completed', completedBy: 'Dominic', date: 'August 14, 2024' },
    { id: '#1239', status: 'Completed', completedBy: 'Alex', date: 'August 15, 2024' },
    { id: '#1240', status: 'Completed', completedBy: 'Emma', date: 'August 16, 2024' },
    { id: '#1240', status: 'Completed', completedBy: 'Emma', date: 'August 16, 2024' },
    { id: '#1240', status: 'Completed', completedBy: 'Emma', date: 'August 16, 2024' },
    { id: '#1240', status: 'Completed', completedBy: 'Emma', date: 'August 16, 2024' },
    { id: '#1240', status: 'Completed', completedBy: 'Emma', date: 'August 16, 2024' },
    { id: '#1241', status: 'Completed', completedBy: 'Liam', date: 'August 17, 2024' },
  ];

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {/* Left Side: Cards Section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {/* Card 1 */}
        <div className="flex flex-col items-center justify-center p-3 bg-orange-400 text-white rounded-lg shadow-md">
          <h2 className="text-xs font-bold">Total Pending</h2>
          <p className="text-lg">10</p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center justify-center p-3 bg-blue-500 text-white rounded-lg shadow-md">
          <h2 className="text-xs font-bold">Total Condemned</h2>
          <p className="text-lg">3</p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center justify-center p-3 bg-green-500 text-white rounded-lg shadow-md">
          <h2 className="text-xs font-bold">Total Completed</h2>
          <p className="text-lg">20</p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center justify-center p-3 bg-violet-500 text-white rounded-lg shadow-md">
          <h2 className="text-xs font-bold">Total Admins</h2>
          <p className="text-lg">5</p>
        </div>
      </div>

      {/* Right Side: Recent Activity and Charts Section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col space-y-4">
        {/* Recent Activity Section */}
        <div className="flex flex-col bg-white p-2 rounded-md shadow-md">
          <h2 className="text-lg font-bold border-b pb-2 mb-1">Recent Activity</h2>
          <div className="overflow-y-auto h-48"> {/* Set fixed height */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">Request ID</th>
                  <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">Completed By</th>
                  <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentActivities.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1">{activity.id}</td>
                    <td className={`px-2 py-1 ${activity.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                      {activity.status}
                    </td>
                    <td className="px-2 py-1">{activity.completedBy}</td>
                    <td className="px-2 py-1">{activity.date}</td>
                    <td className="px-2 py-1">
                      <button className="text-blue-600 hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Section: Responsive Layout */}
        <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-4 lg:space-y-0">
          {/* Latest Requests Section */}
          <div className="flex flex-col bg-white p-2 rounded-md shadow-md w-full lg:w-1/2">
            <h2 className="text-sm font-bold">Latest Requests</h2>
            <div className="mt-1">
              <ul>
                {recentActivities.slice(0, 15).map((activity, index) => ( // Show the latest 5 requests
                  <li key={index} className="py-1">
                    <span className="font-medium">{activity.id}</span> - {activity.completedBy} on {activity.date}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Horizontal Bar Chart */}
          <div className="flex flex-col bg-white p-2 rounded-md shadow-md w-full lg:w-1/2">
            <h2 className="text-sm font-bold">Total Monthly Requests</h2>
            <div className="mt-1 flex-grow">
              <HorizontalBarChart />
            </div>
          </div>
        </div>

        {/* Vertical Bar Chart */}
        <div className="flex flex-col bg-white p-2 rounded-md shadow-md w-full">
          <h2 className="text-sm font-bold">Service Usage</h2>
          <div className="mt-1 flex-grow">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
