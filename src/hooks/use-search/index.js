import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://btl-ge35.onrender.com/products/';
const RATING_URL = 'https://btl-ge35.onrender.com/products/avg_rating/';

function useSearch(searchValue) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const storedResults = localStorage.getItem(`searchResults_${searchValue}`);
        if (storedResults) {
          setSearchResults(JSON.parse(storedResults));
          setLoading(false);
          return;
        }

        const response = await axios.get(BASE_URL, {
          params: { search: searchValue },
        });

        const rawProducts = response.data || [];

        const foundProducts = new Set();
        const uniqueProducts = [];

        rawProducts.forEach(([product]) => {
          if (!foundProducts.has(product.name)) {
            foundProducts.add(product.name);
            uniqueProducts.push(product);
          }
        });

        const ratingPromises = uniqueProducts.map(async (product) => {
          try {
            const ratingResponse = await axios.get(`${RATING_URL}${product.id}`);
            return { ...product, rating: ratingResponse.data.avg_rating || 0 };
          } catch {
            return { ...product, rating: 0 };
          }
        });

        const productsWithRatings = await Promise.all(ratingPromises);

        localStorage.setItem(`searchResults_${searchValue}`, JSON.stringify(productsWithRatings));

        setSearchResults(productsWithRatings);
      } catch (error) {
        console.error('API calling error:', error);
        setError('Search failed. Please try again!');
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchData, 400);
    return () => clearTimeout(delay);
  }, [searchValue]);

  return { searchResults, loading, error };
}

export default useSearch;
