import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../images/relogio.jpg';
import { ProductStyled } from '../styles/HomePageStyles';

function Product({ id, name, price }) {
  return (
    <ProductStyled>
      <Link to={`/product/${id}`}>
        <img src={Image} alt={name} />
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
};

export default Product;
