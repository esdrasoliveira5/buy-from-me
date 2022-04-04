import React, { useContext, useState } from 'react';
import buyFromMeContext from '../context/AppContext';

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
        onChange={(event) => handleSearch(event)}
      />
      <button
        type="button"
        onClick={submitSearch}
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
