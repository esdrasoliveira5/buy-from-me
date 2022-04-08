import React, { useContext, useState } from 'react';
import buyFromMeContext from '../context/AppContext';
import search from '../images/search.png';
import { ButtonHeader } from '../styles/ButtonsStyles';
import SearchBarStyle from '../styles/SearchStyles';

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
    <SearchBarStyle>
      <input
        type="text"
        value={searchValue}
        placeholder="Pesquisar"
        onChange={(event) => handleSearch(event)}
      />
      <ButtonHeader>
        <button
          type="button"
          onClick={submitSearch}
        >
          <img src={search} alt="search" />
        </button>
      </ButtonHeader>
    </SearchBarStyle>
  );
}

export default SearchBar;
