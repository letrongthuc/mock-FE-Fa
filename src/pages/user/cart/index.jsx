import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaCreditCard } from 'react-icons/fa';
export const products = [
  {
    id: 2,
    name: 'Women Lace Splicing Dress Cold Shoulder Flared Sleeve Lacing Medieval Swing Dresses',
    description:
      'Super cute and comfortable, flattering on any body shape. Perfectly highlights your curve and show your body charm.',
    old_price: null,
    price: 666035.0,
    size: 'M',
    quantity_in_stock: 1,
    category_id: 10,
    image: 'https://m.media-amazon.com/images/I/61dYGxx7egL._AC_SL1024_.jpg',
    age_gender: 'Women',
  },
  {
    id: 3,
    name: "Women's Vintage Plaid Christmas Dress, Sleeveless A-Line Party Dress",
    description:
      'Retro pinup dresses for women 1950s cocktail dress. Sleeveless self ties spaghetti straps 50s outfits for women, 50s womens party dresses 2024. Adorable leaves, Christmas candle rings, candy cane, red and green striped, bells print.',
    old_price: null,
    price: 769676.0,
    size: 'M',
    quantity_in_stock: 1,
    category_id: 10,
    image: 'https://m.media-amazon.com/images/I/71NUgLtLNuL._AC_SL1500_.jpg',
    age_gender: 'Women',
  },
  {
    id: 4,
    name: 'Women Plaid Lace-Up Corset Dress Long Sleeve Asymmetrical Hem Vintage Party Dresses',
    description:
      "Women'S Retro A-Line Dress Is Made Of Soft And Breathable Fabric, Which Is Very Comfortable To Wear. Pair With Accessories, Sandals, And High Heels For A Stylish And Glamorous Look.",
    old_price: null,
    price: 1803879.0,
    size: 'S',
    quantity_in_stock: 1,
    category_id: 10,
    image: 'https://m.media-amazon.com/images/I/51eDJcoa9+L._AC_SL1440_.jpg',
    age_gender: 'Women',
  },
  {
    id: 5,
    name: 'Women Plaid Lace-Up Corset Dress Long Sleeve Asymmetrical Hem Vintage Party Dresses',
    description:
      "Women'S Retro A-Line Dress Is Made Of Soft And Breathable Fabric, Which Is Very Comfortable To Wear. Pair With Accessories, Sandals, And High Heels For A Stylish And Glamorous Look.",
    old_price: null,
    price: 1803879.0,
    size: 'M',
    quantity_in_stock: 2,
    category_id: 10,
    image: 'https://m.media-amazon.com/images/I/51eDJcoa9+L._AC_SL1440_.jpg',
    age_gender: 'Women',
  },
];

function Cart() {
  return (
    <>
      <div className="flex font-serif items-center justify-center mt-12 text-[#2C2C47]">
        <h1 className="text-4xl">Your Cart</h1>
      </div>
      <div className="container mx-auto px-20 my-16 text-[#2C2C47] font-serif">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center -mt-6 text-center">
            <p className="text-2xl font-semibold">Your cart is empty!</p>
            <p className="text-lg mt-4">Explore products and add them to your cart.</p>
            <Link to="/sales">
              <button
                className="flex items-center gap-2 justify-center transition duration-300 ease-in-out hover:scale-105 active:scale-95 mt-6 mb-4 px-4
          py-3 bg-[#2C2C47] text-white rounded-2xl font-semibold shadow-md hover:text-orange-400"
              >
                Shop now <FaShoppingBag className="text-lg" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="min-h-[250px] flex flex-col mb-28">
            <div className="text-center -mt-12 mb-12 text-xl">
              Here are the products in your cart. Ready to checkout?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
              {products.map((product) => (
                <div key={product.id} className="relative border rounded-lg overflow-hidden shadow-md bg-white">
                  <button
                    className="absolute top-1 right-1 bg-[#2C2C47] p-2 rounded-full shadow-md"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    <FaTrash className="md:w-4 md:h-4 text-white hover:text-orange-400" title="Remove from cart" />
                  </button>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />

                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <Link to={`/products/${product.id}`} className="hover:text-orange-400" title={product.name}>
                        <h3 className="text-lg font-semibold">
                          {product.name.length > 10 ? product.name.slice(0, 10) + '...' : product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center space-x-2">
                        <span className="text-orange-400 font-bold">₫{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-14 -mb-8">
              <button
                className="transition duration-300 ease-in-out hover:scale-105 active:scale-95 px-6 py-3
                bg-[#2C2C47] text-white rounded-2xl font-semibold shadow-lg hover:bg-orange-500"
                title="Complete your purchase"
              >
                Proceed to Checkout
                <FaCreditCard className="inline text-xl ml-2 mb-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
