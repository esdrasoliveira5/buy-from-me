/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import buyFromMeContext from '../context/AppContext';
import profile from '../images/profile.webp';
import { HidenBox, ProfileBox } from '../styles/HomePageStyles';
import Close from '../images/menu2side.png';
import Menu from '../images/menu2.png';

function ProfileBar() {
  const { logged } = useContext(buyFromMeContext);
  const [menu, setMenu] = useState(false);

  function handlemenu() {
    setMenu(!menu);
  }

  return (
    <HidenBox>
      <label htmlFor="profile">
        <img src={!menu ? Menu : Close} alt="menu" width="40px" />
      </label>
      <input type="checkbox" id="profile" onClick={handlemenu} checked={menu} />
      <ProfileBox>
        <div>
          <Link to="/profile">
            <img src={profile} alt="profile" width="100px" />
            <h4>{logged.name}</h4>
          </Link>
        </div>
        <Link to="/profile/create-product">
          <button type="button">Criar produto</button>
        </Link>
        <Link to="/profile/products">
          <button type="button">Meus Produtos</button>
        </Link>
        <Link to="/profile/orders">
          <button type="button">Minhas Compras</button>
        </Link>
        <Link to="/profile/sales">
          <button type="button">Minhas Vendas</button>
        </Link>
      </ProfileBox>
    </HidenBox>
  );
}

export default ProfileBar;
