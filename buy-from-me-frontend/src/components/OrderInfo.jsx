import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import requests from '../services/requests';
import buyFromMeContext from '../context/AppContext';
import { OrderInfoStyle } from '../styles/InfoStyles';
import { ButtonGreen, ButtonRed } from '../styles/ButtonsStyles';

function OrderInfo({
  id, product, seller, orderDate, buyer,
}) {
  const { logged } = useContext(buyFromMeContext);
  const navigate = useNavigate();
  const date = new Date(orderDate);

  const orderDelete = async () => {
    const response = global.confirm('Excluir o pedido?');
    if (response === true) {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      const orderResponse = await requests.deleteOrder(localResponse.token, id);
      if (orderResponse.message === 'order deleted') {
        global.alert('Pedido Cancelado');
        if (seller.email === logged.email) {
          navigate('/profile/sales');
        } else {
          navigate('/profile/orders');
        }
      }
    }
  };

  const orderConclude = async () => {
    const response = global.confirm('Concluir o pedido?');
    if (response === true) {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      const soldProduct = await requests.deleteProduct(localResponse.token, product.id);
      if (soldProduct.message) {
        global.alert('Pedido Concluido');
        navigate('/profile/sales');
      }
    }
  };

  const buyerOrSeller = () => {
    if (seller.email === logged.email) {
      return (
        <div>
          <h3>Pedido</h3>
          <p>{`Id: ${id}`}</p>
          <p>{`Comprador: ${buyer.name}`}</p>
          <p>{`Contato ${buyer.contact}`}</p>
          <p>{`Email: ${buyer.email}`}</p>
          <p>{`Data do Pedido: ${date.toLocaleString()}`}</p>
        </div>
      );
    }

    return (
      <div>
        <h3>Pedido</h3>
        <p>{`Id: ${id}`}</p>
        <p>{`Vendedor: ${seller.name}`}</p>
        <p>{`Contato: ${seller.contact}`}</p>
        <p>{`Email: ${seller.email}`}</p>
        <p>{`Data do Pedido: ${date.toLocaleString()}`}</p>
      </div>
    );
  };

  return (
    <OrderInfoStyle>
      {buyerOrSeller()}
      <h3>Produto</h3>
      <p>{`Produto: ${product.name}`}</p>
      <p>{`Preço: R$ ${product.price}`}</p>
      <p>{`Estado: ${product.new ? 'Novo' : 'Usado'}`}</p>
      <Link to={`/product/${product.id}`}><h3>Vizualizar Produto</h3></Link>
      <ButtonRed>
        <button
          type="button"
          onClick={orderDelete}
        >
          Cancelar Pedido
        </button>
      </ButtonRed>
      {
        seller.email === logged.email
          ? (
            <ButtonGreen>
              <button
                type="button"
                onClick={orderConclude}
              >
                Concluir Pedido
              </button>
            </ButtonGreen>

          ) : ''
      }
    </OrderInfoStyle>
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
