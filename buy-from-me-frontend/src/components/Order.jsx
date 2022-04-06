import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Order({
  id, orderDate, product, buyer, seller,
}) {
  const date = new Date(orderDate);
  return (
    <tr>
      <td>{id}</td>
      <td>{product.name}</td>
      <td>{buyer.name}</td>
      <td>{seller.name}</td>
      <td>{date.toLocaleString()}</td>
      <td><Link to={`/order/${id}`}>Vizualizar</Link></td>
    </tr>
  );
}

Order.propTypes = {
  buyer: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  orderDate: PropTypes.string.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  seller: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Order;
