import { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingBag, FaGrinStars, FaRegGrinHearts, FaSpinner, FaDizzy } from 'react-icons/fa';
import useFavoriteProducts from '../../../hooks/use-favorite-products';
import useDeleteFavorite from '../../../hooks/use-delete-favorite';
import FavoriteNotification from '../../../components/notification-favorite';

function Favorites() {
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');

  useLayoutEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload && payload.user_id) {
          setUserId(payload.user_id);
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, []);

  const { products, loading, error, refreshFavorites } = useFavoriteProducts(userId);
  const { deleteFavorite, errorDeleteFavorite } = useDeleteFavorite();

  const handleRemoveFromFavorites = async (product) => {
    const success = await deleteFavorite(product.id);
    if (success) {
      refreshFavorites();
    }
    if (errorDeleteFavorite) {
      setMessage(errorDeleteFavorite);
    }
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <>
      {message && <FavoriteNotification message={message} error={errorDeleteFavorite} />}
      <div className="flex font-serif items-center justify-center mt-12 text-[#2C2C47]">
        <h1 className="text-4xl">Your Favorites</h1>
      </div>
      <div className="container mx-auto px-20 my-16 text-[#2C2C47] font-serif">
        {loading ? (
          <div className="flex items-center justify-center gap-2 pb-20 text-3xl text-[#2C2C47] py-6">
            Loading your favorite products
            <FaSpinner className="animate-spin ml-2" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 pb-20 text-3xl text-[#2C2C47] py-6">
            {error} <FaDizzy className="ml-2" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center -mt-6 text-center">
            <p className="text-2xl font-semibold">You haven't liked any products yet!</p>
            <p className="text-lg mt-4">Explore products and add them to your favorites.</p>
            <Link to="/new-arrivals">
              <button
                className="flex items-center gap-2 justify-center transition duration-300 ease-in-out hover:scale-105 active:scale-95 mt-6 mb-4 px-4
          py-3 bg-[#2C2C47] text-white rounded-2xl font-semibold shadow-md hover:text-orange-400"
              >
                Explore now <FaGrinStars className="text-lg" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="min-h-[250px] flex flex-col mb-28">
            <div className="text-center -mt-12 mb-12 text-xl">
              Here are the products you've liked. Keep shopping for more items you love{' '}
              <FaRegGrinHearts className="inline text-2xl mb-1" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 -mb-4">
              {products.map((product) => (
                <div key={product.id} className="relative border rounded-lg overflow-hidden shadow-md bg-white">
                  <button
                    className="absolute top-1 right-1 bg-[#2C2C47] p-2 rounded-full shadow-md"
                    onClick={() => handleRemoveFromFavorites(product)}
                  >
                    <FaHeart className="md:w-4 md:h-4 hover:text-white text-orange-400" title="Remove from favorites" />
                  </button>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />

                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <Link to={`/products/${product.name}`} className="hover:text-orange-400" title={product.name}>
                        <h3 className="text-lg font-semibold">
                          {product.name.length > 10 ? product.name.slice(0, 10) + '...' : product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center space-x-2">
                        {product.old_price && (
                          <span className="text-[#2C2C47] line-through text-sm">
                            ₫{showOldPrice ? product.old_price : ''}
                          </span>
                        )}
                        <span className="text-orange-400 font-bold">₫{product.price}</span>
                      </div>
                    </div>
                    <Link to={`/products/${product.name}`} className="hover:text-orange-400" title={product.name}>
                      <button
                        className="bg-[#2C2C47] text-white p-2 -mr-3 rounded-full shadow-md hover:text-orange-400"
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <FaShoppingBag className="md:w-4 md:h-4" title="Add to cart" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;
