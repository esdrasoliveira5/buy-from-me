import React, {
  useContext, useEffect, useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductInfo from '../components/ProductInfo';
import ProfileBar from '../components/ProfileBar';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
import { BodyStyled, MainStyled } from '../styles/BodyStyles';

function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = Number(location.pathname.split('/')[2]);
  const { setLogged } = useContext(buyFromMeContext);
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({});

  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      if (localResponse !== null) {
        const { token, user } = localResponse;
        const userResponse = await requests.getUser(user.id, token);
        const productsResponse = await requests.getProductById(path);
        const ordersResponse = await requests.getOrders(token, 'buyerId');
        const orderExists = ordersResponse.find(({ productsId }) => productsId === path);
        if (!userResponse.error) {
          setLogged({
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email,
            logged: true,
          });
          setProduct(productsResponse);
          if (orderExists !== undefined) {
            setOrder(orderExists);
          }
        } else {
          setLogged({ logged: false });
          navigate('/');
        }
      } else {
        setLogged({ logged: false });
        navigate('/');
      }
    };
    userLogged();
  }, []);

  const handleOrder = async () => {
    const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
    const responseOrder = await requests.createOrder(localResponse.token, path);
    if (!responseOrder.error) {
      global.alert('Pedido Criado');
      setOrder(responseOrder);
    }
    if (responseOrder.error === 'order already exists') {
      global.alert('Pedido ja criado');
    }
  };
  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        {
          product.name ? (
            <ProductInfo
              name={product.name}
              description={product.description}
              price={product.price}
              newP={product.new}
            />
          )
            : ''
        }
        {
          order.id
            ? (
              <Link to={`/order/${order.id}`}>
                <button type="button">
                  Vizualizar Pedido
                </button>
              </Link>
            )
            : (
              <button
                type="button"
                onClick={handleOrder}
              >
                Criar Pedido
              </button>
            )
        }
        <ProfileBar />
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}

export default Products;
