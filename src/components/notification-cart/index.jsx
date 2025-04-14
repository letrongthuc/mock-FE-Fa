import { FaShoppingBag } from 'react-icons/fa';
import { FaFaceSadTear } from 'react-icons/fa6';

const CartNotification = ({ message, isLoggedIn }) => {
  return (
    <div className="fixed bottom-8 right-6 z-20 bg-orange-500 text-white p-2 rounded-lg shadow-lg transition-opacity duration-300 flex items-center">
      {isLoggedIn ? (
        <>
          <span>Added</span>
          <span className="text-[#2C2C47] mx-1">{message}</span>
          <span>to cart!</span>
          <FaShoppingBag className="ml-2 mb-1" />
        </>
      ) : (
        <>
          <span className="text-[#2C2C47] mx-1">You must log in to add products to cart!</span>
          <FaFaceSadTear className="text-[#2C2C47] ml-1" />
        </>
      )}
    </div>
  );
};

export default CartNotification;
