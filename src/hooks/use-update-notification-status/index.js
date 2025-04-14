import { useState } from 'react';
import axios from 'axios';

function useUpdateNotificationStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleNotificationStatus = async (notificationId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`https://btl-ge35.onrender.com/notifications/${notificationId}`);

      if (response.status !== 200) {
        throw new Error('Failed to update notification status');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { toggleNotificationStatus, loading, error };
}

export default useUpdateNotificationStatus;
