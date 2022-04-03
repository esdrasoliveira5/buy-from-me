import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormStyled from '../styles/FormStyled';
import { MainStyled, BodyStyled } from '../styles/BodyStyled';

function Login() {
  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        <FormStyled>
          <h2>Login</h2>
          <input type="email" />
          <input type="password" />
          <button type="button">
            login
          </button>
        </FormStyled>
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}

export default Login;
