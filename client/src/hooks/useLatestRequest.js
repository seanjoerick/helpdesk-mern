import { useState, useEffect } from 'react';
import axios from 'axios'; 

const useLatestRequest = () => {
    const [latestTicket, setLatestTicket] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(() => {
        const fetchLatestRequest = async () => {
            setLoading(true); 
            setError(null); 
            try {
                const response = await axios.get('/server/ticket/latestrequest'); 

                if (response.status === 200) {
                    setLatestTicket(response.data.ticket); 
                } else {
                    setError(response.data.message || 'Error fetching latest ticket');
                }
            } catch (err) {
                setError(err.message || 'Something went wrong'); 
            } finally {
                setLoading(false);
            }
        };

        fetchLatestRequest(); 

    }, []); 

    return { latestTicket, loading, error }; 
};

export default useLatestRequest;
