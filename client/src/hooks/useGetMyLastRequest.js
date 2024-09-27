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
        setLastRequest(response.data.ticket);
      } catch (err) {
        if (err.response) {
          // If the error response exists, check the status
          if (err.response.status === 404) {
            // Custom error message for 404
            setError("No requests found for this user.");
          } else {
            // General error message for other statuses
            setError(err.response.data.message || "An error occurred while fetching the last request.");
          }
        } else {
          // If no response is available, set the error message to the default message
          setError("An error occurred while fetching the last request.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLastRequest();
  }, []);

  return { lastRequest, loading, error };
};

export default useGetMyLastRequest;
