import { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaSpinner, FaRegFrown } from 'react-icons/fa';
import ItemDescriptions from './item-descriptions';
import ProductPrice from './product-price';
import ItemSizeRate from './item-rate-size';
import ItemButton from './item-button';
import RecommendedProducts from './recommended-products';
import FavoriteNotification from '../notification-favorite';
import CartNotification from '../notification-cart';
import categories from '../../data/categories';
import Filters from '../filter-show';
import useSearchByName from '../../hooks/use-search-by-name';
import addFavorite from '../../hooks/use-add-favorite';

function ItemDetail() {
  const location = useLocation();
  const { isFiltered, filters } = location.state || {};
  const { name } = useParams();
  const { product, loading, error } = useSearchByName(name);
  const categoryName = categories[product?.category_id - 1] || '';
  const category = product?.category_id < 10 ? 'accessories' : 'clothing';

  const [favoriteMessage, setFavoriteMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cartMessage, setCartMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');

  useLayoutEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload && payload.user_id) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (product?.sizes.length > 0) {
      setSelectedSize(product?.sizes[0]);
    }
  }, [product?.sizes]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedSize, setSelectedSize]);

  const handleAddToFavorites = async (product) => {
    const { success, error } = await addFavorite(product.ids[0]);

    if (success) {
      setFavoriteMessage(product?.name);
      setErrorMessage('');
    } else {
      setErrorMessage(error);
      setFavoriteMessage('');
    }

    setTimeout(() => {
      setFavoriteMessage('');
      setErrorMessage('');
    }, 2000);
  };

  const handleAddToCart = (product) => {
    setCartMessage(product?.name);
    setTimeout(() => {
      setCartMessage('');
    }, 2000);
  };

  const handleIncrease = () => {
    const maxQuantity = product?.quantities[product?.sizes.indexOf(selectedSize)] || 0;
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="font-serif">
      {(favoriteMessage || errorMessage) && (
        <FavoriteNotification message={favoriteMessage} isLoggedIn={isLoggedIn} error={errorMessage} />
      )}
      {cartMessage && <CartNotification message={cartMessage} isLoggedIn={isLoggedIn} />}

      {loading ? (
        <div className="flex items-center justify-center gap-2 my-20 pb-20 text-3xl text-[#2C2C47] py-10">
          Loading product
          <FaSpinner className="animate-spin ml-2" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center gap-2 my-20 pb-20 text-3xl text-[#2C2C47] py-10">
          Error loading product. Please try again later
          <FaRegFrown className="text-3xl text-[#2C2C47] animate-bounce" />
        </div>
      ) : product ? (
        <>
          <div className="max-w-4xl mx-auto md:px-8 py-10 md:py-20 flex gap-4 sm:gap-8 md:gap-12 text-[#2C2C47]">
            <div className="hidden sm:block w-2/5">
              <img
                src={product.image}
                alt="Product"
                className="w-full h-96 rounded-lg border border-gray-300 object-contain shadow-md"
              />
            </div>
            <div className="flex-1 space-y-4 text-center sm:pr-20">
              <div className="flex flex-col items-center sm:items-start">
                {product.name && <h2 className="text-2xl font-bold">{product.name}</h2>}
                {isFiltered && filters && <Filters filters={filters} />}
              </div>
              <ProductPrice
                oldPrice={product.oldPrice}
                price={product.price}
                quantity={product.quantities[product.sizes.indexOf(selectedSize)]}
              />
              <ItemSizeRate product={product} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
              <ItemButton
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
                quantity={quantity}
                handleAddToFavorites={handleAddToFavorites}
                handleAddToCart={handleAddToCart}
                product={product}
              />
            </div>
          </div>
          <ItemDescriptions product={product} activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      ) : (
        <div className="flex items-center justify-center gap-2 my-20 pb-20 text-3xl text-[#2C2C47] py-10">
          The product does not exist or has been deleted
          <FaRegFrown className="text-3xl text-[#2C2C47] animate-bounce" />
        </div>
      )}

      {!loading && (
        <RecommendedProducts error={error} product={product} category={category} categoryName={categoryName} />
      )}
    </div>
  );
}

export default ItemDetail;
