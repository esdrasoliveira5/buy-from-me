import PropTypes from 'prop-types';
import React from 'react';
import Image from '../images/relogio.jpg';

function ProductInfo({
  name, description, price, newP, category,
}) {
  return (
    <div>
      <img src={Image} alt={name} width="400px" />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{`R$ ${price}`}</p>
      <p>{newP ? 'Novo' : 'Usado'}</p>
      <p>{category}</p>
    </div>
  );
}

ProductInfo.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  newP: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.number.isRequired,
};

export default ProductInfo;
