import { useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setErrorMessage('');
    setLoading(true);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password!');
      setLoading(false);
      return false;
    }

    try {
      const response = await axios.post(
        'https://btl-ge35.onrender.com/login',
        new URLSearchParams({
          grant_type: 'password',
          username: email,
          password: password,
          scope: '',
          client_id: '',
          client_secret: '',
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      localStorage.setItem('authToken', response.data.access_token);
      setLoading(false);
      return true;
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
      setLoading(false);
      return false;
    }
  };

  return { login, errorMessage, loading };
};

export default useAuth;
