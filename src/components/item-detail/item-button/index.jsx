import { FaHeart, FaShoppingBag } from 'react-icons/fa';

function ItemButton({ handleDecrease, handleIncrease, quantity, handleAddToFavorites, handleAddToCart, product }) {
  return (
    <>
      <div className="flex gap-10 ml-3 pl-24 sm:pl-0">
        <div className="flex items-center border border-gray-400 rounded-full px-3 py-1">
          <button onClick={handleDecrease} className="text-lg px-2 hover:text-orange-400">
            −
          </button>
          <span className="w-8 text-center flex justify-center">{quantity}</span>
          <button onClick={handleIncrease} className="text-lg px-2 hover:text-orange-400">
            +
          </button>
        </div>
        <button
          className="flex items-center gap-2 bg-[#2C2C47] text-white px-4 py-2 rounded-full
            transition duration-300 ease-in-out hover:scale-105 active:scale-95"
          onClick={() => handleAddToFavorites(product)}
        >
          Add to Favorite <FaHeart />
        </button>
      </div>
      <div className="ml-3 pl-24 sm:pl-0">
        <button
          className="flex w-80 items-center gap-4 bg-[#2C2C47] text-white justify-center py-2 rounded-full
            transition duration-300 ease-in-out hover:scale-105 active:scale-95"
          onClick={() => handleAddToCart(product)}
        >
          <FaShoppingBag />
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default ItemButton;
