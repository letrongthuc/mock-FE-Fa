import { clothingProducts, accessoriesProducts } from '../../data/products';
import { Link } from 'react-router-dom';

function ProductGrid({ category }) {
  let products;

  if (category === 'clothing') {
    products = clothingProducts;
  } else if (category === 'accessories') {
    products = accessoriesProducts;
  }

  return (
    <div className="py-12 px-16 md:px-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative overflow-hidden rounded-lg shadow-md min-h-[200px] sm:min-h-[250px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>

            <div className="relative z-10 p-6 text-white flex flex-col items-center justify-center text-center bg-black/40 rounded-lg h-full">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-sm">{product.stock} products in stock</p>
              <Link to={`/${category}/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <button className="transition duration-300 ease-in-out hover:scale-105 active:scale-95 mt-4 px-4 py-2 bg-[#FFDDE2] text-[#4F517D] font-semibold rounded-full text-sm flex items-center gap-2 hover:bg-pink-300 transition">
                  View All →
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
