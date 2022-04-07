import React, {
  useContext, useEffect, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductsContainer from '../components/ProductsContainer';
import OrdersContainer from '../components/OrdersContainer';
import ProfileBar from '../components/ProfileBar';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
import { BodyStyled } from '../styles/BodyStyles';
import { MainStyled } from '../styles/MainStyles';

function ProfileProducts() {
  const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const { setLogged } = useContext(buyFromMeContext);
  const [profile, setProfile] = useState({});
  const [order, setOrder] = useState({
    order: [],
    sales: [],
  });

  useEffect(() => {
    const userLogged = async () => {
      if (localResponse !== null) {
        const { token, user } = localResponse;
        const userResponse = await requests.getUser(user.id, token);
        const ordersResponse = await requests.getOrders(token, 'buyerId');
        const salesResponse = await requests.getOrders(token, 'sellerId');
        if (!userResponse.error) {
          setLogged({
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email,
            logged: true,
          });
          setProfile(userResponse);
          setOrder({
            order: ordersResponse,
            sales: salesResponse,
          });
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

  const container = () => {
    console.log(path);
    if (path === 'products') {
      return (
        <ProductsContainer products={profile.Products} />
      );
    }
    if (path === 'orders') {
      return (
        <OrdersContainer orders={order.order} />
      );
    }
    return (
      <OrdersContainer orders={order.sales} />
    );
  };

  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        <ProfileBar />
        {profile.address ? container() : ''}
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}
export default ProfileProducts;
