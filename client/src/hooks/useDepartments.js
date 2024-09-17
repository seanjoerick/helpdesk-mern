import { useState, useEffect } from 'react';
import axios from 'axios';

const useDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('/server/departments');
                setDepartments(response.data.departments);
            } catch (error) {
                setError('Error fetching departments');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []); 

    return { departments, loading, error };
};

export default useDepartments;
