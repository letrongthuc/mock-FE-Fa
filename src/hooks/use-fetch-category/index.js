import { useState, useEffect } from 'react';
import axios from 'axios';

const CATEGORY_URL = 'https://btl-ge35.onrender.com/categories/';

const useFetchCategory = (name) => {
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (!name) return;

        const encodedName = encodeURIComponent(name);
        const categoryKey = `category_${encodedName}`;

        const storedCategories = localStorage.getItem('categoryCache');
        if (storedCategories) {
          const parsedCategories = JSON.parse(storedCategories);
          if (parsedCategories[categoryKey]) {
            setCategory(parsedCategories[categoryKey]);
            return;
          }
        }

        const response = await axios.get(`${CATEGORY_URL}${encodedName}`);
        const categoryData = response.data || {};

        const updatedCache = { ...(storedCategories ? JSON.parse(storedCategories) : {}), [categoryKey]: categoryData };
        localStorage.setItem('categoryCache', JSON.stringify(updatedCache));

        setCategory(categoryData);
      } catch (err) {
        console.error('API Fetch Error:', err);
      }
    };

    fetchCategory();
  }, [name]); 

  return category;
};

export default useFetchCategory;
