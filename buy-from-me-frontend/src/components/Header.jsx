import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderStyled from '../styles/HeaderStyles';
import SearchBar from './SearchBar';
import logo from '../images/logo.png';
import login from '../images/login.png';

function Header() {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  return (
    <HeaderStyled>
      <Link to="/">
        <img src={logo} alt="logo" width="60px" />
      </Link>
      {
        path !== 'profile'
          ? <SearchBar /> : ''
      }
      <Link to="/login">
        <img src={login} alt="login" width="40px" />
      </Link>
    </HeaderStyled>
  );
}

export default Header;
