import PropTypes from 'prop-types';
import React from 'react';
import { ProductContainerStyled } from '../styles/HomePageStyles';
import Product from './Product';

function ProductsContainer({ products }) {
  if (products.length === 0) {
    return (
      <h1>Carregando...</h1>
    );
  }
  return (
    <div>

      <ProductContainerStyled>
        {products
          ? products.map(({
            name, id, price, categoriesId,
          }) => (
            <Product
              key={id}
              name={name}
              id={id}
              price={price}
              categoriesId={categoriesId}
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
