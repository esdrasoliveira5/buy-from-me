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
import BodyStyled from '../styles/BodyStyles';
import { ButtonGreen, ButtonRed, ButtonYellow } from '../styles/ButtonsStyles';
import { MainStyled } from '../styles/MainStyles';
import { ProdutoInfoStyle } from '../styles/InfoStyles';

function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = Number(location.pathname.split('/')[2]);
  const { logged, setLogged } = useContext(buyFromMeContext);
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
          navigate('/login');
        }
      } else {
        setLogged({ logged: false });
        navigate('/login');
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

  const handleDelete = async () => {
    const response = global.confirm('Deletar o produto?');
    if (response === true) {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      const responseOrder = await requests.deleteProduct(localResponse.token, path);
      if (responseOrder.message) {
        global.alert('Produto Deletado!');
        navigate('/profile/products');
      }
    }
  };
  if (product.usersId === logged.id) {
    return (
      <BodyStyled>
        <Header />
        <MainStyled>
          {
          product.name ? (
            <ProdutoInfoStyle>
              <ProductInfo
                name={product.name}
                description={product.description}
                price={product.price}
                newP={product.new}
                category={product.categoriesId}
              />
              <ButtonRed>
                <button
                  type="button"
                  onClick={handleDelete}
                >
                  Deletar Produto
                </button>
              </ButtonRed>
              <ButtonYellow>
                <Link to={`/product/update/${path}`}>
                  <button
                    type="button"
                  >
                    Editar Produto
                  </button>
                </Link>
              </ButtonYellow>
            </ProdutoInfoStyle>
          )
            : ''
        }
          <ProfileBar />
        </MainStyled>
        <Footer />
      </BodyStyled>
    );
  }

  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        {
          product.name ? (
            <ProdutoInfoStyle>
              <ProductInfo
                name={product.name}
                description={product.description}
                price={product.price}
                newP={product.new}
                category={product.categoriesId}
              />
              {
                order.id
                  ? (
                    <Link to={`/order/${order.id}`}>
                      <h3>
                        Vizualizar Pedido
                      </h3>
                    </Link>
                  )
                  : (
                    <ButtonGreen>
                      <button
                        type="button"
                        onClick={handleOrder}
                      >
                        Criar Pedido
                      </button>
                    </ButtonGreen>
                  )
              }
            </ProdutoInfoStyle>
          )
            : ''
        }
        <ProfileBar />
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}

export default Products;
