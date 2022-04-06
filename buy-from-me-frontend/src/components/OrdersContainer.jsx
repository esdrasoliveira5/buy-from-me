import PropTypes from 'prop-types';
import React from 'react';
import Order from './Order';

function OrdersContainer({ orders }) {
  if (orders.error) {
    return (
      <h1>Voce nao tem pedidos</h1>
    );
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pedido Id</th>
            <th>Produto</th>
            <th>Comprador</th>
            <th>Vendedor</th>
            <th>Data do Pedido</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {!orders.error
            ? orders.map(({
              id, orderDate, product, buyer, seller,
            }) => (
              <Order
                key={id}
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
