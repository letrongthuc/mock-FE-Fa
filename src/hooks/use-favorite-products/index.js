import { useState, useEffect } from 'react';
import axios from 'axios';

const useFavoriteProducts = (userId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    if (!userId) {
      setError('Invalid user ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://btl-ge35.onrender.com/products/user/favourites/${userId}`);

      if (response.status === 200 && Array.isArray(response.data)) {
        const uniqueProducts = [];
        const productNames = new Set();

        response.data.forEach((product) => {
          if (!productNames.has(product.name)) {
            productNames.add(product.name);
            uniqueProducts.push(product);
          }
        });

        setProducts(uniqueProducts);
      } else {
        setError('Failed to fetch favorite products.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  return { products, loading, error, refreshFavorites: fetchFavorites };
};

export default useFavoriteProducts;
