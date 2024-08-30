import { useState, useEffect } from 'react';
import axios from 'axios';

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/server/department');
        setDepartments(response.data);
      } catch (error) {
        setError('Error fetching departments');
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  return { departments, loading, error };
};

export default useDepartments;
