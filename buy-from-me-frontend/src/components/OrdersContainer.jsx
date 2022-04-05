import PropTypes from 'prop-types';
import React from 'react';
import Order from './Order';

function OrdersContainer({ orders }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Produto</th>
            <th>Comprador</th>
            <th>Vendedor</th>
            <th>Data do Pedido</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {orders
            ? orders.map(({
              productsId, id, buyerId, sellerId, orderDate,
            }) => (
              <Order
                key={id}
                productsId={productsId}
                id={id}
                buyerId={buyerId}
                sellerId={sellerId}
                orderDate={orderDate}
              />
            ))
            : []}
        </tbody>
      </table>
    </div>
  );
}

OrdersContainer.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default OrdersContainer;
