import ProductGrid from '../../../components/product-grid';

function Accessories() {
  return (
    <div className="text-center px-4 py-6 md:py-16 font-serif">
      <h2 className="text-[#353753] text-2xl md:text-3xl font-semibold">
        <span className="font-bold">Our</span>{' '}
        <span className="font-extrabold">Collections</span>
      </h2>
      <p className="text-[#353753] mt-2 text-sm md:text-xl">
        Fashion is a silent language of style. <br />
        Our collection perfectly blends modern trends with individuality. <br />
        Find the perfect outfit that speaks for you!
      </p>
      <ProductGrid category="accessories" />
    </div>
  );
}

export default Accessories;
