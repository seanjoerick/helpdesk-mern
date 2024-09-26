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
                <div className="flex-1 bg-[#A3C1DA] text-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total Pending</h3>
                    <p className="text-2xl">{totalPending}</p>
                </div>
                <div className="flex-1 bg-[#A8E6CE] text-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total Completed</h3>
                    <p className="text-2xl">{totalCompleted}</p>
                </div>
                <div className="flex-1 bg-[#9B59B6] text-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total Admin</h3>
                    <p className="text-2xl">{totalAdmin}</p>
                </div>
                <div className="flex-1 bg-[#FF6F61] text-white p-4 rounded shadow">
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
             {/* Graphs Section */}
             <div className="flex flex-wrap justify-between gap-4">
                {/* Bar Graph */}
                <div className="flex-1 p-4 bg-white rounded shadow">
                    <h2 className="font-bold text-lg">Total Requests by Form</h2>
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
