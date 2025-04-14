import { useState } from 'react';
import axios from 'axios';

const useDeleteNotification = () => {
  const [errorDeleteNotification, setError] = useState(null);

  const deleteNotification = async (id) => {
    setError(null);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('You are not logged in!');
      return false;
    }

    try {
      const response = await axios.delete(`https://btl-ge35.onrender.com/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      return response.status === 200 || response.status === 204;
    } catch (err) {
      setError(err.response?.data?.detail || 'An unknown error occurred.');
      return false;
    }
  };

  return { deleteNotification, errorDeleteNotification };
};

export default useDeleteNotification;
