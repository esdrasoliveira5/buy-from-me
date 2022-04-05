import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../images/relogio.jpg';
import requests from '../services/requests';

function OrderInfo({
  id, product, buyer, seller, orderDate,
}) {
  const navigate = useNavigate();
  const date = new Date(orderDate);

  const orderDelete = async () => {
    const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
    const orderResponse = await requests.deleteOrder(localResponse.token, id);
    if (orderResponse.message === 'order deleted') {
      global.alert('Pedido Cancelado');
      navigate('/profile/orders');
    }
  };

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
      <button
        type="button"
        onClick={orderDelete}
      >
        Cancelar Pedido
      </button>
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
