import BarChart from '../components/BarChart';
import HorizontalBarChart from '../components/HorizontalBarChart';
import useTotalAdmin from '../hooks/useTotalAdmin';
import useTotalCompletedTickets from '../hooks/useTotalCompletedTickets';
import useTotalPendingTickets from '../hooks/useTotalPendingTickets';
import useLatestRequest from '../hooks/useLatestRequest';

const Dashboard = () => {
    const { totalPending } = useTotalPendingTickets();
    const { totalCompleted } = useTotalCompletedTickets();
    const { totalAdmin } = useTotalAdmin();
    const { latestTicket, loading, error } = useLatestRequest();

    return (
        <div className="p-4 flex flex-col gap-4">
            {/* Cards Section */}
            <div className="flex flex-wrap justify-between gap-4">
                <div className="flex-1 bg-[#A3C1DA] p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total Pending</h3>
                    <p className="text-2xl">{totalPending}</p>
                </div>
                <div className="flex-1 bg-[#A8E6CE] p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total Completed</h3>
                    <p className="text-2xl">{totalCompleted}</p>
                </div>
                <div className="flex-1 bg-[#9B59B6] p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total Admin</h3>
                    <p className="text-2xl">{totalAdmin}</p>
                </div>
                <div className="flex-1 bg-[#FF6F61] p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total Condemned</h3>
                    <p className="text-2xl">1</p>
                </div>
            </div>
            {loading ? (
                <p>Loading latest request...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p> // Optional: Add styling for error messages
            ) : latestTicket ? (
                <div className="pb-2">
                    <h2 className="font-bold text-lg">Latest Request</h2>
                    <p><strong>Username: </strong>{latestTicket.comments[0]?.user?.username || 'N/A'}</p>
                    <p><strong>Location: </strong>{latestTicket.comments[0]?.user?.department?.name || 'N/A'}</p>
                    <p><strong>Device No: </strong>{latestTicket.comments[0]?.deviceNo || 'N/A'}</p>
                    <p><strong>Status: </strong>
                        <span className={latestTicket.status === 'pending' ? "text-yellow-500" : "text-green-500"}>
                            {latestTicket.status.charAt(0).toUpperCase() + latestTicket.status.slice(1)} {/* Capitalize first letter */}
                        </span>
                    </p>
                    <p><strong>Date: </strong>
                        {latestTicket.createdAt 
                            ? new Date(latestTicket.createdAt).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                              }) 
                            : 'N/A'}
                    </p>
                    <p><strong>Description: </strong>{latestTicket.comments[0]?.descriptionProblem || 'No description provided.'}</p>
                </div>
            ) : (
                <p>No latest request available.</p>
            )}

            {/* Latest Requests */}
            <div className="p-4 bg-white rounded shadow">
                <h2 className="font-bold text-lg">Latest Activities</h2>
                <div className="space-y-4">
                    {/* Latest Requests Table */}
                    <table className="min-w-full border-collapse mb-4">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left">Request No</th>
                                <th className="px-6 py-4 text-left">Location</th>
                                <th className="px-6 py-4 text-left">Requested By</th>
                                <th className="px-6 py-4 text-left">Action Taken</th>
                                <th className="px-6 py-4 text-left">Completed By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Sample Rows for Latest Requests */}
                            {Array.from({ length: 5 }).map((_, index) => {
                                return (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="px-6 py-4">{340811 + index}</td>
                                        <td className="px-6 py-4">Location {index + 1}</td>
                                        <td className="px-6 py-4">Ryan</td>
                                        <td className="px-6 py-4">
                                            <span>Fix the computer</span>
                                        </td>
                                        <td className="px-6 py-4">John Doe</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Graphs Section */}
            <div className="flex flex-wrap justify-between gap-4">
                {/* Bar Graph */}
                <div className="flex-1 p-4 bg-white rounded shadow">
                    <h2 className="font-bold text-lg">Total Monthly Requests</h2>
                    <BarChart />
                </div>

                {/* Horizontal Graph */}
                <div className="flex-1 p-4 bg-white rounded shadow">
                    <h2 className="font-bold text-lg">Monthly Total Requests</h2>
                    <HorizontalBarChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
