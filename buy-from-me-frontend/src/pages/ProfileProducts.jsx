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
import { BodyStyled, MainStyled } from '../styles/BodyStyles';

function ProfileProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const { setLogged } = useContext(buyFromMeContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      if (localResponse !== null) {
        const { token, user } = localResponse;
        const userResponse = await requests.getUser(user.id, token);
        if (!userResponse.error) {
          setLogged({
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email,
            logged: true,
          });
          setProfile(userResponse);
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

  const container = () => {
    if (path === 'products') {
      return (
        <ProductsContainer products={profile.Products} />
      );
    }

    if (path === 'orders') {
      return (
        <OrdersContainer orders={profile.Orders} />
      );
    }
    return (
      <OrdersContainer orders={profile.sales} />
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
