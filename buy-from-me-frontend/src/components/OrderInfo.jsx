import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import requests from '../services/requests';
import buyFromMeContext from '../context/AppContext';

function OrderInfo({
  id, product, seller, orderDate, buyer,
}) {
  const { logged } = useContext(buyFromMeContext);
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

  const orderConclude = async () => {
    const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
    const soldProduct = await requests.deleteProduct(localResponse.token, product.id);
    if (soldProduct.message) {
      global.alert('Pedido Concluido');
      navigate('/profile/sales');
    }
  };

  const buyerOrSeller = () => {
    if (seller.email === logged.email) {
      return (
        <div>
          <h3>Pedido</h3>
          <p>{id}</p>
          <p>{`Comprador ${buyer.name}`}</p>
          <p>{`Contato ${buyer.contact}`}</p>
          <p>{`Email ${buyer.email}`}</p>
          <p>{date.toLocaleString()}</p>
        </div>
      );
    }

    return (
      <div>
        <h3>Pedido</h3>
        <p>{id}</p>
        <p>{`Vendedor ${seller.name}`}</p>
        <p>{`Contato ${seller.contact}`}</p>
        <p>{`Email ${seller.email}`}</p>
        <p>{date.toLocaleString()}</p>
      </div>
    );
  };

  return (
    <div>
      {buyerOrSeller()}
      <h3>Produto</h3>
      <h3>{product.name}</h3>
      <p>{`R$ ${product.price}`}</p>
      <p>{product.new ? 'Novo' : 'Usado'}</p>
      <Link to={`/product/${product.id}`}><h3>Vizualizar Produto</h3></Link>
      <button
        type="button"
        onClick={orderDelete}
      >
        Cancelar Pedido
      </button>
      {
        seller.email === logged.email
          ? (
            <button
              type="button"
              onClick={orderConclude}
            >
              Concluir Pedido
            </button>
          ) : ''
      }
    </div>
  );
}

OrderInfo.propTypes = {
  id: PropTypes.number.isRequired,
  orderDate: PropTypes.string.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    new: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  seller: PropTypes.shape({
    name: PropTypes.string.isRequired,
    contact: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  buyer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    contact: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderInfo;
