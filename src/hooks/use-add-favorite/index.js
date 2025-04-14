import axios from 'axios';

const addFavorite = async (productId) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return { success: false, error: 'You are not logged in!' };
  }

  try {
    const response = await axios.post(
      `https://btl-ge35.onrender.com/products/user/favourite/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    return { success: response.status === 200 || response.status === 201, error: null };
  } catch (err) {
    const errorMsg = err.response?.data?.detail || 'An unknown error occurred.';
    return { success: false, error: errorMsg };
  }
};

export default addFavorite;
