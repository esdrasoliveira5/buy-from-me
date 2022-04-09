import React, {
  useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileBar from '../components/ProfileBar';
import ProfileInfo from '../components/ProfileInfo';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
import BodyStyled from '../styles/BodyStyles';
import { MainStyled } from '../styles/MainStyles';

function Profile() {
  const navigate = useNavigate();
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
          navigate('/login');
        }
      } else {
        setLogged({ logged: false });
        navigate('/login');
      }
    };
    userLogged();
  }, []);

  return (
    <BodyStyled>
      <Header />
      <MainStyled>
        <ProfileBar />
        {
          profile.address
            ? (
              <ProfileInfo
                name={profile.name}
                lastName={profile.lastName}
                email={profile.email}
                contact={profile.contact}
                address={profile.address}
              />
            )
            : ''
        }
      </MainStyled>
      <Footer />
    </BodyStyled>
  );
}
export default Profile;
