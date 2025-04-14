import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://btl-ge35.onrender.com/products/name/';
const RATING_URL = 'https://btl-ge35.onrender.com/products/avg_rating/';
const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL'];

function useSearchByName(productName) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productName.trim()) {
      setProduct(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem(`product_${productName}`);
        if (storedData) {
          setProduct(JSON.parse(storedData));
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}${encodeURIComponent(productName)}`);
        if (!response.data || response.data.length === 0) {
          setProduct(null);
          setLoading(false);
          return;
        }
        const products = response.data;

        const mergedProduct = products.reduce(
          (
            acc,
            { id, size, quantity_in_stock, name, price, description, old_price, category_id, image, age_gender }
          ) => {
            acc.ids.push(id);
            if (!acc.sizes.includes(size)) acc.sizes.push(size);
            acc.quantities[size] = (acc.quantities[size] || 0) + quantity_in_stock;

            acc.name = name;
            acc.description = description;
            acc.price = price;
            acc.old_price = old_price;
            acc.category_id = category_id;
            acc.image = image;
            acc.age_gender = age_gender;

            return acc;
          },
          {
            ids: [],
            sizes: [],
            quantities: {},
            name: '',
            description: '',
            price: 0,
            old_price: 0,
            category_id: 1,
            image: '',
            age_gender: '',
          }
        );

        mergedProduct.sizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
        mergedProduct.quantities = mergedProduct.sizes.map((size) => mergedProduct.quantities[size] || 0);

        try {
          const ratingResponse = await axios.get(`${RATING_URL}${encodeURIComponent(mergedProduct.ids[0])}`);
          mergedProduct.rating = ratingResponse.data?.avg_rating || 0;
        } catch {
          mergedProduct.rating = 0;
        }

        localStorage.setItem(`product_${productName}`, JSON.stringify(mergedProduct));
        setProduct(mergedProduct);
      } catch (error) {
        console.error('API calling error:', error);
        setError('Search failed. Please try again!');
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchData, 400);
    return () => clearTimeout(delay);
  }, [productName]);

  return { product, loading, error };
}

export default useSearchByName;
