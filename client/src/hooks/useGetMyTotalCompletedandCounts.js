import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetMyTotalCompletedandCounts = () => {
    const [completedTickets, setCompletedTickets] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCompletedTicketsAndCount = async () => {
        try {
            const response = await axios.get('/server/ticket/tickets/getmycompleted-counts');
            if (response.status === 200) {
                setCompletedTickets(response.data.tickets); 
                setCompletedCount(response.data.count);   
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
        fetchCompletedTicketsAndCount(); 

        const interval = setInterval(() => {
            fetchCompletedTicketsAndCount(); 
        }, 500);

        return () => clearInterval(interval); 
    }, []);

    return { completedTickets, completedCount, loading, error };
};

export default useGetMyTotalCompletedandCounts;
