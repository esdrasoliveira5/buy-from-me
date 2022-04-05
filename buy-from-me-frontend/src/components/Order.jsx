import PropTypes from 'prop-types';
import React from 'react';

function Order({
  id, productsId, buyerId, sellerId, orderDate,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{productsId}</td>
      <td>{buyerId}</td>
      <td>{sellerId}</td>
      <td>{orderDate}</td>
      <td>Visualizar</td>
    </tr>
  );
}

Order.propTypes = {
  buyerId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  orderDate: PropTypes.string.isRequired,
  productsId: PropTypes.number.isRequired,
  sellerId: PropTypes.string.isRequired,
};

export default Order;
