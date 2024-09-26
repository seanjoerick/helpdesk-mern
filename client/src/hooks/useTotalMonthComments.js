import { useState, useEffect } from 'react';

const useTotalCommentsThisMonth = () => {
    const [totalComments, setTotalComments] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

    const fetchTotalComments = async () => {
        try {
            const response = await fetch('/server/ticket/tickets/totalcomments/monthly');
            const data = await response.json();

            if (response.ok) {
                setTotalComments(data.total); 
            } else {
                setError(data.message || 'Error fetching total comments');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchTotalComments();
    }, []);

    return { totalComments, error, loading };
};

export default useTotalCommentsThisMonth;
