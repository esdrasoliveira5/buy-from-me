import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import buyFromMeContext from '../context/AppContext';
import Image from '../images/relogio.jpg';
import { FilterBox } from '../styles/HomePageStyles';

function ProfileBar() {
  const { logged } = useContext(buyFromMeContext);
  return (
    <FilterBox>
      <Link to="/profile">
        <img src={Image} alt="profile" width="100px" />
        <h4>{logged.name}</h4>
      </Link>
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
    </FilterBox>
  );
}

export default ProfileBar;
