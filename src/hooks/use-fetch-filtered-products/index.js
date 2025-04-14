import axios from 'axios';
import { useState, useEffect } from 'react';
import { useProductContext } from '../../components/product-context';

const BASE_URL = 'https://btl-ge35.onrender.com/products/';
const RATING_URL = 'https://btl-ge35.onrender.com/products/avg_rating/';

const useFetchFilteredProducts = ({
  category,
  size,
  priceMin,
  priceMax,
  quantityInStockMin,
  quantityInStockMax,
  ageGender,
  minRating,
  maxRating,
  newArrivals,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { categoryProducts, setCategoryProducts } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const validFilters = Object.fromEntries(
          Object.entries({
            category,
            priceMin,
            priceMax,
            quantityInStockMin,
            quantityInStockMax,
            ageGender,
            minRating,
            maxRating,
            ...(Array.isArray(size) && size.length > 0 ? { size } : {}),
          }).filter(([_, v]) => v != null)
        );

        const queryString = Object.entries(validFilters)
          .map(([key, value]) =>
            Array.isArray(value)
              ? value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&')
              : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join('&');

        const categoryKey = JSON.stringify(validFilters);

        const storedProducts = JSON.parse(localStorage.getItem('categoryProducts') || '{}');
        if (storedProducts[categoryKey]) {
          setProducts(storedProducts[categoryKey]);
          setLoading(false);
          return;
        }

        const url = `${BASE_URL}?${queryString}`;
        const response = await axios.get(url);
        const rawProducts = response.data || [];

        const groupedProducts = {};

        rawProducts.forEach(([product]) => {
          const name = product?.name?.trim().toLowerCase();
          if (name && !groupedProducts[name]) {
            groupedProducts[name] = product;
          }
        });

        const productsArray = Object.values(groupedProducts);

        const ratingPromises = productsArray.map(async (product) => {
          try {
            const ratingResponse = await axios.get(`${RATING_URL}${product.id}`);
            return { ...product, rating: ratingResponse.data.avg_rating || 0 };
          } catch {
            return { ...product, rating: 0 };
          }
        });

        const productsWithRatings = await Promise.all(ratingPromises);

        setCategoryProducts((prev) => {
          const updated = { ...prev, [categoryKey]: productsWithRatings };
          localStorage.setItem('categoryProducts', JSON.stringify(updated));
          return updated;
        });

        setProducts(productsWithRatings);
      } catch (err) {
        console.error('API Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    category,
    size,
    priceMin,
    priceMax,
    quantityInStockMin,
    quantityInStockMax,
    ageGender,
    minRating,
    maxRating,
    categoryProducts,
    setCategoryProducts,
  ]);

  return {
    products: newArrivals ? [...products].reverse() : products,
    loading,
  };
};

export default useFetchFilteredProducts;
