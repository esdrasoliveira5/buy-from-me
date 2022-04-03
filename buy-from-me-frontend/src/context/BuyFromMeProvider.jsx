import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import buyFromMeContext from './AppContext';

function BuyFromMe({ children }) {
  const [logged, setLogged] = useState({
    logged: false,
    name: '',
    lastName: '',
    email: '',
  });
  const contextValue = useMemo(() => ({
    logged,
    setLogged,
  }), [logged]);

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
