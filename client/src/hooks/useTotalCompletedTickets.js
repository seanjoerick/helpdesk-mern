import { useState, useEffect } from 'react';

const useTotalCompletedTickets = () => {
    const [totalCompleted, setTotalCompleted] = useState(0); 
    const [error, setError] = useState(null); 

    const fetchTotalCompleted = async () => {
        try {
            const response = await fetch('/server/ticket/tickets/completed'); 
            const data = await response.json(); 

            if (response.ok) {
                setTotalCompleted(data.count); 
            } else {
                setError(data.message || 'Error fetching completed tickets'); 
            }
        } catch (err) {
            setError(err.message || 'Something went wrong'); 
        }
    };

    useEffect(() => {
        fetchTotalCompleted(); 

        const interval = setInterval(() => {
            fetchTotalCompleted(); 
        }, 500); 

        return () => clearInterval(interval); 
    }, []); 

    return { totalCompleted, error };
};

export default useTotalCompletedTickets;

