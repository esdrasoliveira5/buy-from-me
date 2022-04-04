import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import buyFromMeContext from '../context/AppContext';
import Image from '../images/relogio.jpg';
import { FilterBox } from '../styles/HomePageStyles';

function ProfileBar() {
  const { logged } = useContext(buyFromMeContext);
  return (
    <FilterBox>
      <div>
        <img src={Image} alt="profile" width="100px" />
        <h4>{logged.name}</h4>
        <p>{logged.email}</p>
        <p>Editar Perfil</p>
      </div>
      <Link to="/create-product">
        <button type="button">Criar produto</button>
      </Link>
      <Link to="/orders">
        <button type="button">Minhas Compras</button>
      </Link>
      <Link to="/sell">
        <button type="button">Minhas Vendas</button>
      </Link>
    </FilterBox>
  );
}

export default ProfileBar;
