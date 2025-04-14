import { useState, useEffect } from 'react';
import ProductList from '../../../components/product-list';
import Filter from '../../../components/filter';

function NewArrivals() {
  const [filters, setFilters] = useState([]);
  const [resetPage, setResetPage] = useState(false);

  useEffect(() => {
    setResetPage(true);
  }, [filters]);

  const size = filters
    .filter((filter) => filter.id.startsWith('size-'))
    .map((filter) => filter.id.replace('size-', '').toUpperCase());

  const priceMin = filters.find((filter) => filter.id === 'min-price')?.value || null;
  const priceMax = filters.find((filter) => filter.id === 'max-price')?.value || null;
  const minRate = filters.find((filter) => filter.id === 'min-rate')?.value || null;
  const maxRate = filters.find((filter) => filter.id === 'max-rate')?.value || null;
  const quantityInStockMin = filters.find((filter) => filter.id === 'min-quantity-in-stock')?.value || null;
  const quantityInStockMax = filters.find((filter) => filter.id === 'max-quantity-in-stock')?.value || null;

  const ageGender = filters.some((filter) => filter.id === 'men')
    ? 'Men'
    : filters.some((filter) => filter.id === 'kids')
    ? 'Kids'
    : filters.some((filter) => filter.id === 'babies')
    ? 'Babies'
    : filters.some((filter) => filter.id === 'women')
    ? 'Women'
    : null;

  return (
    <div className="md:px-16 md:py-20 md:space-y-10 font-serif">
      <div className="text-center text-xl text-orange-500 sm:text-2xl md:text-3xl md:-mt-4 -mb-4 font-bold">
        New Arrivals
      </div>
      <p className="text-[#2C2C47] text-sm md:text-xl text-center">
        Discover the latest trends in fashion with our newest arrivals.
        <br />
        Stay ahead of the style game with fresh, high-quality clothing that fits every occasion!
      </p>
      <Filter filters={filters} setFilters={setFilters} />

      <ProductList
        {...(ageGender ? { ageGender } : {})}
        size={size}
        showPagination={true}
        resetPage={resetPage}
        setResetPage={setResetPage}
        priceMin={priceMin}
        priceMax={priceMax}
        minRating={minRate}
        maxRating={maxRate}
        quantityInStockMin={quantityInStockMin}
        quantityInStockMax={quantityInStockMax}
        newArrivals={true}
      />
    </div>
  );
}

export default NewArrivals;
