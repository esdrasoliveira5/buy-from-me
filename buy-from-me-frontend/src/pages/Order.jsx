import React, {
  useContext, useEffect, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import OrderInfo from '../components/OrderInfo';
import ProfileBar from '../components/ProfileBar';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
import { BodyStyled } from '../styles/BodyStyles';
import { MainStyled } from '../styles/MainStyles';

function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = Number(location.pathname.split('/')[2]);
  const { setLogged } = useContext(buyFromMeContext);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      if (localResponse !== null) {
        const { token, user } = localResponse;
        const userResponse = await requests.getUser(user.id, token);
        const orderResponse = await requests.getOrder(token, path);
        if (!userResponse.error) {
          setLogged({
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email,
            logged: true,
          });
          setOrder(orderResponse);
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

  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        {
          order.id ? (
            <OrderInfo
              id={order.id}
              product={order.product}
              buyer={order.buyer}
              seller={order.seller}
              orderDate={order.orderDate}
            />
          )
            : ''
        }
        <ProfileBar />
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}

export default Order;
