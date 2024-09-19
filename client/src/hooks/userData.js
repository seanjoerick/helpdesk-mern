import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export const useAdminData = () => useFetchData('/server/user/admins');
export const useUserData = () => useFetchData('/server/user/users');
export const useAccountsData = () => useFetchData('/server/user/accounts');
