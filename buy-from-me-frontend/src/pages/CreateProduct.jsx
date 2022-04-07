import React, {
  useContext, useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductForm from '../components/ProductForm';
import ProductUpdateForm from '../components/productUpdateForm';
import ProfileBar from '../components/ProfileBar';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
import { BodyStyled, MainStyled } from '../styles/BodyStyles';

function CreateProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const { setLogged } = useContext(buyFromMeContext);

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
  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        {
          path === 'update' ? <ProductUpdateForm /> : <ProductForm />
        }
        <ProfileBar />
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}

export default CreateProduct;
