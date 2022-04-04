import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import buyFromMeContext from './AppContext';

function BuyFromMe({ children }) {
  const [products, setProducts] = useState([]);
  const [logged, setLogged] = useState({
    logged: false,
    name: '',
    email: '',
  });
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    newP: '',
    sold: '',
    price: '',
    filter: '',
  });
  const contextValue = useMemo(() => ({
    logged,
    setLogged,
    products,
    setProducts,
    filters,
    setFilters,
  }), [logged, products, filters]);

  return (
    <buyFromMeContext.Provider value={contextValue}>
      { children }
    </buyFromMeContext.Provider>
  );
}

BuyFromMe.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BuyFromMe;
