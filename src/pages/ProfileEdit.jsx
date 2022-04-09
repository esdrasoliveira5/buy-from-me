import React, {
  useContext, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileBar from '../components/ProfileBar';
import UserFormUpdate from '../components/UserFormUpdate';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
import BodyStyled from '../styles/BodyStyles';
import { ButtonRed } from '../styles/ButtonsStyles';
import { MainStyled } from '../styles/MainStyles';

function ProfileEdit() {
  const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
  const navigate = useNavigate();
  const { logged, setLogged } = useContext(buyFromMeContext);

  useEffect(() => {
    const userLogged = async () => {
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
          navigate('/login');
        }
      } else {
        setLogged({ logged: false });
        navigate('/login');
      }
    };
    userLogged();
  }, []);

  const handleDelete = async () => {
    const response = global.confirm('Tem certeza?');
    if (response === true) {
      const userDelete = await requests.deleteUser(localResponse.token, logged.id);
      if (userDelete.message === 'user deleted') {
        global.alert('Usuario deletado');
        setLogged({
          id: '',
          name: '',
          email: '',
          logged: false,
        });
        navigate('/login');
      }
    }
  };

  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        <ProfileBar />
        <UserFormUpdate />
        <div>
          <p>Excluir sua Conta?</p>
          <ButtonRed>
            <button
              type="button"
              onClick={handleDelete}
            >
              Excluir Conta
            </button>
          </ButtonRed>
        </div>
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}
export default ProfileEdit;
