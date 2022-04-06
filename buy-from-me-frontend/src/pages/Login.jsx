import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormStyled from '../styles/FormStyles';
import { MainStyled, BodyStyled } from '../styles/BodyStyles';
import buyFromMeContext from '../context/AppContext';
import request from '../services/requests';
import { loginValidation } from '../validation/validations';

function Login() {
  const navigate = useNavigate();
  const { logged, setLogged } = useContext(buyFromMeContext);
  const [login, setlogin] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      if (localResponse !== null) {
        const { token, user } = localResponse;
        const response = await request.getUser(user.id, token);
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

  const handleLogin = ({ target }) => {
    const { name, value } = target;
    setlogin({
      ...login,
      [name]: value,
    });
  };

  const submitLogin = async () => {
    const validation = loginValidation(login);
    if (validation === true) {
      const result = await request.loginUser(login);
      if (result.token) {
        const { token, user } = result;
        localStorage.setItem('buy-from-me', JSON.stringify({ user, token }));
        setLogged({
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          logged: true,
        });
        global.alert('Bem Vindo!');
        navigate('/home');
      } else {
        global.alert(result.error);
      }
    } else {
      global.alert(validation);
    }
  };

  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        {
          !logged.logged
            ? (
              <FormStyled>
                <h2>Login</h2>
                <label htmlFor="email">
                  <input
                    type="email"
                    value={login.email}
                    name="email"
                    placeholder="Email"
                    onChange={(event) => handleLogin(event)}
                  />
                </label>
                <label htmlFor="password">
                  <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={login.password}
                    onChange={(event) => handleLogin(event)}
                  />
                </label>
                <button
                  type="button"
                  onClick={submitLogin}
                >
                  login
                </button>
                <Link to="/register">
                  <button
                    type="button"
                  >
                    Cadastrar

                  </button>
                </Link>
              </FormStyled>
            ) : <p>Carregando...</p>
        }
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}

export default Login;
