import { FaHeart } from 'react-icons/fa';
import { FaFaceSadTear } from 'react-icons/fa6';
import { FaRegGrinHearts } from 'react-icons/fa';

const FavoriteNotification = ({ message, isLoggedIn, error }) => {
  return (
    <div className="fixed bottom-8 right-6 z-20 bg-orange-500 text-white p-2 rounded-lg shadow-lg transition-opacity duration-300 flex items-center">
      {error ? (
        <>
          <span className="text-[#2C2C47] mx-1">{error}</span>
          <FaRegGrinHearts className="ml-1 text-xl text-[#2C2C47]" />
        </>
      ) : isLoggedIn ? (
        <>
          <span>Added</span>
          <span className="text-[#2C2C47] mx-1">{message}</span>
          <span>to favorites!</span>
          <FaHeart className="ml-2" />
        </>
      ) : (
        <>
          <span className="text-[#2C2C47] mx-1">You must log in to add products to favorites!</span>
          <FaFaceSadTear className="text-[#2C2C47] ml-1" />
        </>
      )}
    </div>
  );
};

export default FavoriteNotification;
