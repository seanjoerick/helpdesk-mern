import { useState, useEffect } from 'react';

const useTotalForm = () => {
    const [totalForm, setTotalForm] = useState(0); 
    const [error, setError] = useState(null); 

    const fetchTotalForm = async () => {
        try {
            const response = await fetch('/server/ticket/tickets/totalform');
            const data = await response.json(); 

            if (response.ok) {
                setTotalForm(data.data);
            } else {
                setError(data.message || 'Error fetching total form'); 
            }
        } catch (err) {
            setError(err.message || 'Something went wrong'); 
        }
    };

    useEffect(() => {
        fetchTotalForm(); 

        const interval = setInterval(() => {
            fetchTotalForm(); 
        }, 500);

        return () => clearInterval(interval); 
    }, []); 

    return { totalForm, error };
};

export default useTotalForm;
