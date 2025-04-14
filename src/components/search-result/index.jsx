import Tippy from '@tippyjs/react/headless';
import { FaSadTear } from 'react-icons/fa';
import Item from '../items';
import LoadingText from './loading-text';

function SearchResult({
  searchResults,
  loading,
  error,
  showResults,
  searchValue,
  setSearchValue,
  setShowResults,
  inputRef,
}) {
  return (
    <Tippy
      appendTo={document.body}
      interactive
      visible={showResults && searchValue.trim().length > 0}
      offset={[10, 11]}
      render={(attrs) => (
        <div
          tabIndex="-1"
          {...attrs}
          className="bg-white text-gray-800 relative md:right-6 w-40 md:w-80 max-h-60 overflow-y-auto py-1 px-1 shadow-xl whitespace-normal break-words"
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          {loading && (
            <span>
              Searching
              <LoadingText />
            </span>
          )}
          {!loading && error && <p className="text-red-500 text-lg">{error}</p>}

          {!loading &&
            !error &&
            searchResults.length > 0 &&
            searchResults.map((result) => <Item key={result.id} data={result} setSearchValue={setSearchValue} />)}

          {!loading && !error && searchResults.length === 0 && searchValue.trim().length > 0 && (
            <div className="text-[#2C2C47] text-lg flex items-center gap-1">
              <span>No results found</span>
              <FaSadTear className="text-gray-600 ml-1" />
            </div>
          )}
        </div>
      )}
      onClickOutside={() => setShowResults(false)}
    >
      <span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-full text-gray-800 w-20 sm:w-40 md:w-60 lg:w-80 xl:w-96 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
          title="Search for products"
          spellCheck="false"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
      </span>
    </Tippy>
  );
}

export default SearchResult;
