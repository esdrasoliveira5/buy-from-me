import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import UserForm from '../components/UserForm';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
import BodyStyled from '../styles/BodyStyles';
import { RegisterMainStyled } from '../styles/MainStyles';

function Register() {
  const navigate = useNavigate();
  const { setLogged } = useContext(buyFromMeContext);

  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      if (localResponse !== null) {
        const { token, user } = localResponse;
        const response = await requests.getUser(user.id, token);
        if (!response.error) {
          setLogged({
            id: response.id,
            name: response.name,
            email: response.email,
            logged: true,
          });
          navigate('/home');
        } else {
          setLogged({ logged: false });
        }
      } else {
        setLogged({ logged: false });
      }
    };
    userLogged();
  }, []);
  return (
    <BodyStyled>
      <Header />
      <RegisterMainStyled>
        <UserForm />
      </RegisterMainStyled>
      <Footer />
    </BodyStyled>
  );
}
export default Register;
