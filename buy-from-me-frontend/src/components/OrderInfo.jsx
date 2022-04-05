import PropTypes from 'prop-types';
import React from 'react';
import Image from '../images/relogio.jpg';

function OrderInfo({
  id, product, buyer, seller, orderDate,
}) {
  const date = new Date(orderDate);

  return (
    <div>
      <h3>Pedido</h3>
      <p>{id}</p>
      <p>{`Comprador ${buyer.name}`}</p>
      <p>{`Vendedor ${seller.name}`}</p>
      <p>{date.toLocaleString()}</p>
      <h3>Produto</h3>
      <img src={Image} alt={product.name} width="400px" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{`R$ ${product.price}`}</p>
      <p>{product.newP ? 'Novo' : 'Usado'}</p>
    </div>
  );
}

OrderInfo.propTypes = {
  buyer: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  orderDate: PropTypes.string.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    newP: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  seller: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderInfo;
