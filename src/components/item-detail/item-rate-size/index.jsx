import { FaStar } from "react-icons/fa";

function ItemSizeRate({ product, selectedSize, setSelectedSize }) {
  return (
    <>
      {product?.rating !== undefined && (
        <div className="flex items-center gap-1 ml-3 pl-40 sm:pl-0">
          <span className="mr-2 text-lg border-r pr-2 font-semibold border-gray-400">Rate</span>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < product.rating ? 'text-[#2C2C47]' : 'text-gray-400'} />
          ))}
          <span className="text-sm">({product.rating})</span>
        </div>
      )}
      {product?.sizes !== undefined && product.sizes[0] && (
        <div className="flex items-center gap-1 ml-3 pl-40 sm:pl-0">
          <span className="mr-2 text-lg border-r pr-3 font-semibold border-gray-400">Size</span>
          <div className="flex gap-8">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`${selectedSize === size ? 'font-semibold underline' : 'hover:text-orange-400'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}{' '}
    </>
  );
}

export default ItemSizeRate;
