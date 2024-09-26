import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetMyPendingandCounts = () => {
    const [pendingsTickets, setPendingTickets] = useState([]);
    const [pendingCount, setpendingCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPendingTicketsAndCount = async () => {
        try {
            const response = await axios.get('/server/ticket/tickets/getmypendings-counts');
            if (response.status === 200) {
                setPendingTickets(response.data.tickets); 
                setpendingCount(response.data.count);   
            } else {
                setError('Error fetching data');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingTicketsAndCount(); 

        const interval = setInterval(() => {
            fetchPendingTicketsAndCount(); 
        }, 500);

        return () => clearInterval(interval); 
    }, []);

    return { pendingsTickets, pendingCount, loading, error };
};

export default useGetMyPendingandCounts;
