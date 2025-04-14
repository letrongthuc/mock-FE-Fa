import { useState, useEffect } from 'react';
import ProductList from '../../../components/product-list';
import Filter from '../../../components/filter';

function Sales() {
  const [ageGender, setAgeGender] = useState('Women');
  const [resetPage, setResetPage] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setResetPage(true);
  }, [ageGender, filters]);

  const size = filters
    .filter((filter) => filter.id.startsWith('size-'))
    .map((filter) => filter.id.replace('size-', '').toUpperCase());

  const priceMin = filters.find((filter) => filter.id === 'min-price')?.value || null;
  const priceMax = filters.find((filter) => filter.id === 'max-price')?.value || null;
  const minRate = filters.find((filter) => filter.id === 'min-rate')?.value || null;
  const maxRate = filters.find((filter) => filter.id === 'max-rate')?.value || null;
  const quantityInStockMin = filters.find((filter) => filter.id === 'min-quantity-in-stock')?.value || null;
  const quantityInStockMax = filters.find((filter) => filter.id === 'max-quantity-in-stock')?.value || null;

  return (
    <section className="font-serif px-12 sm:px-20 md:px-24 lg:px-32 py-8 sm:py-12 md:py-16">
      <h2 className="text-center text-orange-500 font-semibold text-xl sm:text-2xl md:text-3xl md:-mt-6 md:mb-6">
        SALE
      </h2>
      <p className="text-[#2C2C47] text-sm md:text-xl text-center -mt-2">
        Enjoy the hottest deals! Get up to <strong className="text-orange-500">50%</strong> off on the trendiest fashion
        items. <br />
        Don’t miss this chance to grab your favorite styles at unbeatable prices!
      </p>
      <div className="text-sm md:text-lg space-x-8 sm:md-space-x-16 md:space-x-28 text-[#2C2C47] text-center mb-2 md:mb-4 mt-6">
        {['Women', 'Men', 'Kids', 'Babies'].map((cat) => (
          <button
            key={cat}
            className={`hover:text-orange-400 transition duration-200 ${ageGender === cat ? 'text-green-400' : ''}`}
            onClick={() => setAgeGender(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <Filter filters={filters} setFilters={setFilters} hiddenFilters={['men', 'women', 'kids', 'babies']} />
      <ProductList
        ageGender={ageGender}
        size={size}
        resetPage={resetPage}
        setResetPage={setResetPage}
        showPagination={true}
        showOldPrice={true}
        priceMin={priceMin}
        priceMax={priceMax}
        minRating={minRate}
        maxRating={maxRate}
        quantityInStockMin={quantityInStockMin}
        quantityInStockMax={quantityInStockMax}
      />
    </section>
  );
}

export default Sales;
