import { useLocation, Link } from 'react-router-dom';
import { FaHeart, FaClipboardList, FaArrowRight, FaUserAstronaut } from 'react-icons/fa';

function Profile() {
  const location = useLocation();
  const user = location.state?.user;

  const favorites = [
    { id: 1, imageUrl: 'https://m.media-amazon.com/images/I/51eDJcoa9+L._AC_SL1440_.jpg' },
    { id: 2, imageUrl: 'https://m.media-amazon.com/images/I/71NUgLtLNuL._AC_SL1500_.jpg' },
    { id: 3, imageUrl: 'https://m.media-amazon.com/images/I/614gnlfQt2L._AC_SL1500_.jpg' },
  ];

  const orders = [
    { id: 1, imageUrl: 'https://m.media-amazon.com/images/I/71ZWpd2FEFL._AC_SL1500_.jpg' },
    { id: 2, imageUrl: 'https://m.media-amazon.com/images/I/718jGn7YfkL._AC_SL1500_.jpg' },
    { id: 3, imageUrl: 'https://m.media-amazon.com/images/I/41HJ8owxhAL._AC_SR400,400_.jpg' },
  ];

  return (
    <div className="font-serif ">
      <div className="flex items-center justify-center mt-12 space-x-3 text-[#2C2C47]">
        <h1 className="text-4xl">Your Profile</h1>
        <FaUserAstronaut className="text-4xl mb-2" />
      </div>

      <div className="max-w-4xl mx-auto md:px-8 py-10 -mt-8 md:py-20 flex gap-4 sm:gap-8 md:gap-12 ">
        <div className="hidden sm:block w-2/5">
          <img
            src="/images/default-avatar.jpg"
            className="w-72 h-72 rounded-full border border-gray-300 object-cover shadow-md"
          />
        </div>
        <div className="flex flex-col mt-8">
          <div className="text-2xl font-semibold text-[#2C2C47]">
            {user.fullname} <span className="text-lg font-light text-gray-500 ml-2">{user.email}</span>
          </div>

          <div className="flex text-xl text-[#2C2C47] mt-5">
            <FaHeart className="mt-1 mr-3" /> Your Favorite Products:
          </div>
          <div className="mt-2 flex gap-2">
            {favorites.slice(0, 3).map((product) => (
              <img
                key={product.id}
                src={product.imageUrl}
                className="w-10 h-10 rounded-full border border-gray-300 object-contain shadow-md"
              />
            ))}
            <Link to="/favorites">
              <button
                className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-md"
                title="View Details"
              >
                <FaArrowRight className="text-xl text-gray-600 hover:text-orange-500" />
              </button>
            </Link>
          </div>
          <div className="flex text-xl text-[#2C2C47] mt-3">
            <FaClipboardList className="mt-1 mr-3" /> Your Orders:
          </div>
          <div className="mt-2 flex gap-2">
            {orders.slice(0, 3).map((product) => (
              <img
                key={product.id}
                src={product.imageUrl}
                className="w-10 h-10 rounded-full border border-gray-300 object-contain shadow-md"
              />
            ))}
            <button
              className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-md"
              title="View Details"
            >
              <FaArrowRight className="text-xl text-gray-600 hover:text-orange-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
