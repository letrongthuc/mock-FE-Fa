import { useState, useEffect } from 'react';
import axios from 'axios';

const USER_URL = 'https://btl-ge35.onrender.com/users/';

const useFetchUserData = (userId) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;

        const userKey = `user_${userId}`;

        const storedUsers = localStorage.getItem('userCache');
        if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          if (parsedUsers[userKey]) {
            setUser(parsedUsers[userKey]);
            return;
          }
        }

        const response = await axios.get(`${USER_URL}${userId}`);
        const userData = response.data || {};

        const updatedCache = {
          ...(storedUsers ? JSON.parse(storedUsers) : {}),
          [userKey]: userData,
        };
        localStorage.setItem('userCache', JSON.stringify(updatedCache));

        setUser(userData);
      } catch (err) {
        console.error('API Fetch Error:', err);
      }
    };

    fetchUser();
  }, [userId]);

  return user;
};

export default useFetchUserData;
