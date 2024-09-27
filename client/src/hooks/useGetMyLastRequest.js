import { useEffect, useState } from "react";
import axios from "axios";

const useGetMyLastRequest = () => {
  const [lastRequest, setLastRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastRequest = async () => {
      try {
        const response = await axios.get('/server/ticket/tickets/getmylastrequest');
        setLastRequest(response.data.ticket);  // Adjusted to access the 'ticket' field
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLastRequest();
  }, []);

  return { lastRequest, loading, error };
};

export default useGetMyLastRequest;
