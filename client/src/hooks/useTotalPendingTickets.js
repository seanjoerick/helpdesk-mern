import { useState, useEffect } from 'react';

const useTotalPendingTickets = () => {
    const [totalPending, setTotalPending] = useState(0); 
    const [error, setError] = useState(null); 

    const fetchTotalPending = async () => {
        try {
            const response = await fetch('/server/ticket/tickets/pending'); 
            const data = await response.json(); 

            if (response.ok) {
                setTotalPending(data.count); 
            } else {
                setError(data.message || 'Error fetching pending tickets'); 
            }
        } catch (err) {
            setError(err.message || 'Something went wrong'); 
        }
    };

    useEffect(() => {
        fetchTotalPending(); 

        const interval = setInterval(() => {
            fetchTotalPending(); 
        }, 500); 

        return () => clearInterval(interval); 
    }, []); 

    return { totalPending, error };
};

export default useTotalPendingTickets;
