import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductsContainer from '../components/ProductsContainer';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
import { BodyStyled, MainStyled } from '../styles/BodyStyles';

function Home() {
  const navigate = useNavigate();
  const {
    setLogged,
    setProducts,
    filters,
    products,
  } = useContext(buyFromMeContext);

  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      if (localResponse !== null) {
        const { token, user } = localResponse;
        const userResponse = await requests.getUser(user.id, token);
        const productsResponse = await requests.getProducts(1);
        if (!userResponse.error) {
          setLogged({
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email,
            logged: true,
          });
          if (products.length === 0) {
            setProducts(productsResponse);
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

  useEffect(() => {
    const searchProducts = async () => {
      const newProducts = await requests.getProductsByFilter(1, filters);
      setProducts(newProducts);
    };
    searchProducts();
  }, [filters]);

  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        <h2>FilterBar</h2>
        <ProductsContainer />
        <h2>ProfileBar</h2>
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}
export default Home;
