import { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import FavoriteNotification from '../../notification-favorite';
import addFavorite from '../../../hooks/use-add-favorite';

function Products({ currentProducts, showOldPrice, isFiltered, filters }) {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleAddToFavorites = async (product) => {
    const { success, error } = await addFavorite(product.id);

    if (success) {
      setMessage(product?.name);
      setErrorMessage('');
    } else {
      setErrorMessage(error);
      setMessage('');
    }

    setTimeout(() => {
      setMessage('');
      setErrorMessage('');
    }, 2000);
  };

  return (
    <div className="relative">
      {(message || errorMessage) && (
        <FavoriteNotification message={message} isLoggedIn={isLoggedIn} error={errorMessage} />
      )}

      <div className="grid md:space-x-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="relative border rounded-lg overflow-hidden shadow-md bg-white">
            <button
              className="absolute top-1 right-1 bg-[#2C2C47] p-2 rounded-full shadow-md"
              onClick={() => handleAddToFavorites(product)}
            >
              <FaHeart className="md:w-4 md:h-4 text-white hover:text-orange-400" title="Add to favorites" />
            </button>
            <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />

            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  <Link
                    to={`/products/${product.name}`}
                    className="hover:text-orange-400"
                    state={{ isFiltered, filters }}
                    title={product.name}
                  >
                    {product.name.length > 9 ? product.name.slice(0, 9) + '...' : product.name}
                  </Link>
                </h3>
                <div className="flex items-center space-x-2">
                  {product.oldPrice && (
                    <span className="text-[#2C2C47] line-through text-sm">₫{showOldPrice ? product.oldPrice : ''}</span>
                  )}
                  <span className="text-orange-400 font-bold">₫{product.price}</span>
                </div>
              </div>
              <Link to={`/products/${product.name}`} state={{ isFiltered, filters }}>
                <button className="bg-[#2C2C47] text-white p-2 -mr-3 rounded-full shadow-md hover:text-orange-400">
                  <FaShoppingBag className="md:w-4 md:h-4" title="Add to cart" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
