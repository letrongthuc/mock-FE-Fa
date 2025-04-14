import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductList from '../product-list';
import useFetchCategory from '../../hooks/use-fetch-category';
import Filter from '../filter';

function CategoryProductList() {
  const { productName } = useParams();
  const formattedProductName = productName
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const description = useFetchCategory(formattedProductName).description;

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
    <div className="px-16 py-16 font-serif text-[#2C2C47]">
      <h1 className="text-center mb-8 text-3xl font-bold">{formattedProductName}</h1>
      <p className="text-center text-lg px-24 mb-8">{description}</p>

      <Filter filters={filters} setFilters={setFilters} />

      <ProductList
        {...(ageGender ? { ageGender } : {})}
        category={formattedProductName}
        showPagination={true}
        size={size}
        resetPage={resetPage}
        setResetPage={setResetPage}
        priceMin={priceMin}
        priceMax={priceMax}
        minRating={minRate}
        maxRating={maxRate}
        quantityInStockMin={quantityInStockMin}
        quantityInStockMax={quantityInStockMax}
      />
    </div>
  );
}

export default CategoryProductList;
