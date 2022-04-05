import PropTypes from 'prop-types';
import React from 'react';
import { ProductContainerStyled } from '../styles/HomePageStyles';
import Product from './Product';
import SearchBar from './SearchBar';

function ProductsContainer({ products }) {
  return (
    <div>
      <SearchBar />
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
