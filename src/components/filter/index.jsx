import { useState } from 'react';
import { FaTimes, FaCaretDown } from 'react-icons/fa';
import { FiFilter } from "react-icons/fi";
import availableFilters from '../../data/filter';

function Filter({ filters, setFilters, hiddenFilters = [] }) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id));
    setSelectedFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const clearFilters = () => {
    setFilters([]);
    setSelectedFilters([]);
  };

  const handleFilterChange = (filter, value = null) => {
    setSelectedFilters((prev) => {
      let updatedFilters = [...prev];

      if (filter.type === 'input') {
        let numericValue = Number(value);
        if (filter.id.includes('price') || filter.id.includes('stock')) {
          numericValue = Math.max(numericValue, 0);
        } else if (filter.id.includes('rate')) {
          numericValue = Math.min(Math.max(numericValue, 0), 5);
        }
        updatedFilters = updatedFilters.filter((f) => f.id !== filter.id);
        if (value !== '') updatedFilters.push({ ...filter, value: numericValue });
      } else {
        const categoryFilters = ['men', 'women', 'kids', 'babies'];
        if (categoryFilters.includes(filter.id)) {
          if (updatedFilters.some((f) => f.id === filter.id)) {
            updatedFilters = updatedFilters.filter((f) => f.id !== filter.id);
          } else {
            updatedFilters = updatedFilters.filter((f) => !categoryFilters.includes(f.id));
            updatedFilters.push(filter);
          }
        } else {
          const isAlreadySelected = updatedFilters.some((f) => f.id === filter.id);
          updatedFilters = isAlreadySelected
            ? updatedFilters.filter((f) => f.id !== filter.id)
            : [...updatedFilters, filter];
        }
      }
      return updatedFilters;
    });
  };

  const applyFilters = () => {
    setFilters(selectedFilters);
    setShowFilters(false);
  };

  return (
    <div className="flex items-center gap-3 px-4 sm:mx-8 md:px-10 py-2 mb-8 relative">
      <button
        className="text-lg text-[#2C2C47] flex items-center font-bold hover:text-orange-400"
        onClick={toggleFilters}
      >
        <FiFilter className="mr-2 text-[#2C2C47]" />
        Filters
        <FaCaretDown />
      </button>

      <div className="flex gap-2 flex-wrap">
        {filters.map((filter) => (
          <div key={filter.id} className="bg-[#2C2C47] text-white px-3 py-1 rounded-full flex items-center">
            {filter.label}
            <button
              onClick={() => {
                removeFilter(filter.id);
                setSelectedFilters((prev) => prev.filter((f) => f.id !== filter.id));
              }}
              className="ml-2 text-sm"
            >
              <FaTimes className="hover:text-gray-300" />
            </button>
          </div>
        ))}
      </div>

      {filters.length > 0 && (
        <button
          onClick={clearFilters}
          className="bg-[#2C2C47] rounded-full px-3 py-1 text-white hover:bg-red-500 flex gap-1 items-center ml-4"
        >
          Clear <FaTimes />
        </button>
      )}

      {showFilters && (
        <div
          className="absolute text-[#2C2C47] top-full left-0 w-60 bg-white shadow-md rounded-md p-4 mt-2 z-50"
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          <div className="flex items-center justify-between font-bold mb-2 -mt-2">
            <span>Filter Options</span>
            <button className="text-gray-400 hover:text-[#2C2C47]" title="Close" onClick={() => setShowFilters(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {availableFilters
              .filter((filter) => !hiddenFilters.includes(filter.id))
              .map((filter) => (
                <label key={filter.id} className="flex items-center">
                  {filter.type === 'input' ? (
                    <input
                      type="input"
                      className="border border-gray-300 px-2 py-1 rounded-md w-full"
                      placeholder={filter.placeholder}
                      min={filter.id.includes('rate') ? '0' : '0'}
                      max={filter.id.includes('rate') ? '5' : undefined}
                      value={selectedFilters.find((f) => f.id === filter.id)?.value || ''}
                      onChange={(e) => handleFilterChange(filter, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && applyFilters()} 
                    />
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        checked={selectedFilters.some((f) => f.id === filter.id)}
                        onChange={() => handleFilterChange(filter)}
                        onKeyDown={(e) => e.key === 'Enter' && applyFilters()} 
                      />
                      {filter.label}
                    </>
                  )}
                </label>
              ))}
          </div>

          <button
            className="bg-[#2C2C47] text-white px-3 py-1 hover:text-orange-400 rounded-md mt-4 w-full"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Filter;
