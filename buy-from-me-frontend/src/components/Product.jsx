import PropTypes from 'prop-types';
import React from 'react';
import Image from '../images/relogio.jpg';
import { ProductStyled } from '../styles/HomePageStyles';

function Product({ id, name, price }) {
  return (
    <ProductStyled value={id}>
      <img src={Image} alt={name} />
      <h4>{name}</h4>
      <p>{`R$ ${price}`}</p>
    </ProductStyled>
  );
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
