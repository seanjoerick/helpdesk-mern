import { useState, useEffect } from 'react';

const useTotalAdmin = () => {
    const [totalAdmin, setTotalAdmin] = useState(0); 
    const [error, setError] = useState(null); 

    const fetchTotalAdmin = async () => {
        try {
            const response = await fetch('/server/user/admincount'); 
            const data = await response.json(); 

            if (response.ok) {
                setTotalAdmin(data.count); 
            } else {
                setError(data.message || 'Error fetching admin'); 
            }
        } catch (err) {
            setError(err.message || 'Something went wrong'); 
        }
    };

    useEffect(() => {
        fetchTotalAdmin(); 

        const interval = setInterval(() => {
            fetchTotalAdmin(); 
        }, 500); 

        return () => clearInterval(interval); 
    }, []); 

    return { totalAdmin, error };
};

export default useTotalAdmin;
