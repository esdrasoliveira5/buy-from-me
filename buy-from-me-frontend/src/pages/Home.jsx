import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductsContainer from '../components/ProductsContainer';
import ProductsFilters from '../components/ProductsFilters';
import ProfileBar from '../components/ProfileBar';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
import { BodyStyled, MainStyled } from '../styles/BodyStyles';

function Home() {
  const navigate = useNavigate();
  const {
    logged,
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
        const newProducts = productsResponse.filter(({ usersId }) => usersId !== userResponse.id);
        if (!userResponse.error) {
          setLogged({
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email,
            logged: true,
          });
          if (products.length === 0) {
            setProducts(newProducts);
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
      const filterProducts = newProducts.filter(({ usersId }) => usersId !== logged.id);
      setProducts(filterProducts);
    };
    searchProducts();
  }, [filters]);

  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        <ProductsFilters />
        <ProductsContainer products={products} />
        <ProfileBar />
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}
export default Home;
