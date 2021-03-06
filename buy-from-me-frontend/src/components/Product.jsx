import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import categoryImage from '../services/categoryImage';
import { ProductStyled } from '../styles/HomePageStyles';

function Product({
  id, name, price, categoriesId,
}) {
  return (
    <ProductStyled>
      <Link to={`/product/${id}`}>
        <img src={categoryImage(categoriesId)} alt={name} />
        <h4>{name}</h4>
        <p>{`R$ ${price}`}</p>
      </Link>
    </ProductStyled>
  );
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  categoriesId: PropTypes.number.isRequired,
};

export default Product;
