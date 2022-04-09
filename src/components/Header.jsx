import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderStyled from '../styles/HeaderStyles';
import SearchBar from './SearchBar';
import logo from '../images/logo.png';
import login from '../images/login.png';
import logout from '../images/logout.png';
import buyFromMeContext from '../context/AppContext';
import { ButtonNone } from '../styles/ButtonsStyles';

function Header() {
  const { logged, setLogged } = useContext(buyFromMeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  const logoutLogin = () => {
    if (logged.logged === true) {
      const response = global.confirm('Sair ?');
      if (response === true) {
        localStorage.removeItem('buy-from-me');
        setLogged({
          id: '',
          name: '',
          email: '',
          logged: false,
        });
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <HeaderStyled>
      <Link to="/">
        <img src={logo} alt="logo" width="60px" />
      </Link>
      {
        path !== 'profile'
          ? <SearchBar /> : ''
      }
      <ButtonNone>
        <button
          type="button"
          onClick={logoutLogin}
        >
          <img src={logged.logged ? logout : login} alt="login" width="40px" />
        </button>
      </ButtonNone>
    </HeaderStyled>
  );
}

export default Header;
