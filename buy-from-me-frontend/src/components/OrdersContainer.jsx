import PropTypes from 'prop-types';
import React from 'react';
import Order from './Order';

function OrdersContainer({ orders }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pedido Id</th>
            <th>Produto Id</th>
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
              productsId, id, orderDate, product, buyer, seller,
            }) => (
              <Order
                key={id}
                productsId={productsId}
                id={id}
                orderDate={orderDate}
                product={product}
                buyer={buyer}
                seller={seller}
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
