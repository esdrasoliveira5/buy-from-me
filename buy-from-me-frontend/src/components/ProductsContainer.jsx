import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProductContainerStyled } from '../styles/HomePageStyles';
import Product from './Product';
import SearchBar from './SearchBar';

function ProductsContainer({ products }) {
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  if (products.length === 0) {
    return (
      <h1>Voce nao tem produtos</h1>
    );
  }
  return (
    <div>
      {
        path === 'home'
          ? <SearchBar /> : ''
      }
      <ProductContainerStyled>
        {products
          ? products.map(({ name, id, price }) => (
            <Product
              key={id}
              name={name}
              id={id}
              price={price}
            />
          ))
          : []}
      </ProductContainerStyled>
    </div>
  );
}

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ProductsContainer;
