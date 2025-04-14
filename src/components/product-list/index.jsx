import { useState, useEffect } from 'react';
import { FaSpinner, FaRegFrown } from 'react-icons/fa';
import Products from './products';
import useFetchFilteredProducts from '../../hooks/use-fetch-filtered-products';
import useFetchRecommendProducts from '../../hooks/use-fetch-recommended-product';

function ProductList({
  category,
  resetPage,
  setResetPage,
  showPagination,
  showOldPrice,
  size,
  priceMin,
  priceMax,
  quantityInStockMin,
  quantityInStockMax,
  ageGender,
  minRating,
  maxRating,
  isRecommended,
  productId,
  categoryId,
  newArrivals,
}) {
  const recommendedData = useFetchRecommendProducts(productId, categoryId);
  const filteredData = useFetchFilteredProducts({
    category,
    size,
    priceMin,
    priceMax,
    quantityInStockMin,
    quantityInStockMax,
    ageGender,
    minRating,
    maxRating,
    newArrivals,
  });

  const { products, loading } = isRecommended ? recommendedData : filteredData;

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const isFiltered = [
    category,
    size,
    priceMin,
    priceMax,
    quantityInStockMin,
    quantityInStockMax,
    ageGender,
    minRating,
    maxRating,
  ].some((value) => value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0));

  const filtersData = {
    category,
    size,
    priceMin,
    priceMax,
    quantityInStockMin,
    quantityInStockMax,
    ageGender,
    minRating,
    maxRating,
  };

  const filters = Object.keys(filtersData).reduce((acc, key) => {
    const value = filtersData[key];
    if (value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)) {
      acc[key] = value;
    } else {
      acc[key] = null;
    }
    return acc;
  }, {});

  useEffect(() => {
    if (resetPage) {
      setCurrentPage(1);
      setResetPage(false);
    }
  }, [resetPage, setResetPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto px-4 text-[#2C2C47] font-serif">
      <div className="min-h-[250px] flex flex-col -mt-2">
        {loading ? (
          <div className="flex justify-center items-center min-h-[250px]">
            <p className="text-lg font-medium flex items-center gap-2">
              Filtering products
              {loading && <FaSpinner className="animate-spin ml-1" />}
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center min-h-[250px]">
            <p className="text-lg font-medium flex items-center gap-2">
              No products available <FaRegFrown className="text-3xl text-gray-500 animate-bounce" />
            </p>
          </div>
        ) : (
          <Products
            currentProducts={currentProducts}
            showOldPrice={showOldPrice}
            isFiltered={isFiltered}
            filters={filters}
          />
        )}
      </div>

      {showPagination && !loading && products.length > 0 && (
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border shadow-md ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
            }`}
          >
            ◀ Prev
          </button>
          <span className="w-16 text-center text-lg font-medium">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border shadow-md ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
            }`}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
