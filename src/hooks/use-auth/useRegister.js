import { useState } from 'react';
import axios from '@/utils/axios';

const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async (fullname, email, password, confirmPassword) => {
    setErrorMessage('');
    setLoading(true);

    if (!fullname || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill out all fields.');
      setLoading(false);
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setLoading(false);
      return false;
    }

    try {
      await axios.post('/register', {
        fullname,  // ✅ đúng theo schema backend
        email,
        password,
      });

      setLoading(false);
      return true;
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || 'Registration failed.');
      setLoading(false);
      return false;
    }
  };

  return { register, errorMessage, loading };
};

export default useRegister;
