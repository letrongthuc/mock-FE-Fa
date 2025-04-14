import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://btl-ge35.onrender.com/products';
const RATING_URL = 'https://btl-ge35.onrender.com/products/avg_rating/';

function useFetchRecommendProducts(productId, categoryId) {
  const [products, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const firstId = Array.isArray(productId) && productId.length > 0 ? productId[0] : null;
  const lastId = Array.isArray(productId) && productId.length > 1 ? productId[1] : firstId;

  useEffect(() => {
    const fetchData = async () => {
      if (!productId || isNaN(firstId) || isNaN(lastId)) {
        setLoading(false);
        setRecommendedProducts([]);
        return;
      }

      setLoading(true);

      const storedRecommendedProducts = localStorage.getItem(`recommendedProducts_${firstId}`);
      if (storedRecommendedProducts) {
        setRecommendedProducts(JSON.parse(storedRecommendedProducts) || []);
        setLoading(false);
        return;
      }

      const foundProducts = new Set();
      let recommended = [];
      let count = 0;
      let currentId = firstId > 400 ? firstId - 1 : lastId + 1;
      let direction = firstId > 400 ? -1 : 1;
      let switchedDirection = false;

      while (count < 5) {
        try {
          const response = await axios.get(`${BASE_URL}/${currentId}`);

          if (response.status === 200 && response.data) {
            const product = response.data;

            if (product.category_id !== categoryId) {
              if (!switchedDirection) {
                currentId = firstId > 400 ? lastId + 1 : firstId - 1;
                direction *= -1;
                switchedDirection = true;
                continue;
              } else {
                break;
              }
            }

            if (!foundProducts.has(product.name)) {
              foundProducts.add(product.name);
              recommended.push(product);
              count++;
            }
          }

          currentId += direction;
        } catch (error) {
          console.error(error);
          break;
        }
      }

      const ratingPromises = recommended.map(async (product) => {
        try {
          const ratingResponse = await axios.get(`${RATING_URL}${product.id}`);
          return { ...product, rating: ratingResponse.data.avg_rating || 0 };
        } catch {
          return { ...product, rating: 0 };
        }
      });

      const productsWithRatings = await Promise.all(ratingPromises);

      setRecommendedProducts(productsWithRatings);
      localStorage.setItem(`recommendedProducts_${firstId}`, JSON.stringify(productsWithRatings));

      setLoading(false);
    };

    fetchData();
  }, [productId, categoryId]);

  return { products, loading };
}

export default useFetchRecommendProducts;
