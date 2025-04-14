import { useState, useEffect } from 'react';
import axios from 'axios';

function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://btl-ge35.onrender.com/notifications/user/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        setError(error.message || 'Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const unreadCount = notifications.filter((notification) => !notification.is_read).length;

  return { notifications, loading, error, unreadCount };
}

export default useNotifications;
