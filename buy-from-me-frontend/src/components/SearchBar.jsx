import React, { useContext, useState } from 'react';
import buyFromMeContext from '../context/AppContext';
import search from '../images/search.png';

function SearchBar() {
  const { filters, setFilters } = useContext(buyFromMeContext);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = ({ target }) => {
    setSearchValue(target.value);
  };

  const submitSearch = () => {
    setFilters({
      ...filters,
      name: searchValue,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        placeholder="Pesquisar"
        onChange={(event) => handleSearch(event)}
      />
      <button
        type="button"
        onClick={submitSearch}
      >
        <img src={search} alt="search" />
      </button>
    </div>
  );
}

export default SearchBar;
