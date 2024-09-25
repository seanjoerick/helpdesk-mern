import { useState, useEffect } from 'react';
import axios from 'axios';

const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/server/ticket/alltickets');
                setTickets(response.data.tickets);
            } catch (error) {
                setError('Error fetching tickets');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []); 

    return { tickets, setTickets,loading, error };
};

export default useTickets;

