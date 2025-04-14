import { FaCheck } from 'react-icons/fa';

const ProductPrice = ({ oldPrice, price, quantity }) => {
  return (
    <div className="space-x-4">
      {oldPrice && <span className="text-xl line-through">₫{oldPrice}</span>}
      {price && <span className="text-xl text-orange-500 font-semibold mr-2">₫{price}</span>}
      {quantity !== undefined && (
        <span className="text-lg text-orange-400 inline-flex items-center w-16">
          {quantity} left
          <FaCheck className="text-xs ml-1 mt-1" />
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
