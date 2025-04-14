import { useState, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import useSearch from '../../hooks/use-search';
import SearchResult from '../search-result';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(true);

  const inputRef = useRef(null);

  const { searchResults, loading, error } = useSearch(searchValue);

  return (
    <div className="relative text-sm md:text-lg">
      <SearchResult
        searchResults={searchResults}
        loading={loading}
        error={error}
        showResults={showResults}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setShowResults={setShowResults}
        inputRef={inputRef}
      />

      {searchValue.length > 0 && (
        <button
          className="absolute right-6 md:right-8 top-3 md:top-2.5 text-gray-400 hover:text-gray-700 cursor-pointer"
          title="Clear search"
          onClick={() => {
            setSearchValue('');
            inputRef.current.focus();
          }}
        >
          <FaTimes className="text-sm md:text-lg" />
        </button>
      )}

      <FaSearch
        className="absolute text-sm md:text-lg right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-700 active:text-gray-900 transition duration-200"
        title="Click to search for the entered item"
      />
    </div>
  );
}

export default Search;
