import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileInfoStyle } from '../styles/ProfileStyles';

const states = [
  { id: 1, name: 'MG' },
  { id: 2, name: 'AC' },
  { id: 3, name: 'AL' },
  { id: 4, name: 'AP' },
  { id: 5, name: 'AM' },
  { id: 6, name: 'BA' },
  { id: 7, name: 'CE' },
  { id: 8, name: 'DF' },
  { id: 9, name: 'ES' },
  { id: 10, name: 'GO' },
  { id: 11, name: 'MA' },
  { id: 12, name: 'MT' },
  { id: 13, name: 'MS' },
  { id: 14, name: 'PA' },
  { id: 15, name: 'PB' },
  { id: 16, name: 'PR' },
  { id: 17, name: 'PE' },
  { id: 18, name: 'PI' },
  { id: 19, name: 'RJ' },
  { id: 20, name: 'RN' },
  { id: 21, name: 'RS' },
  { id: 22, name: 'RO' },
  { id: 23, name: 'RR' },
  { id: 24, name: 'SC' },
  { id: 25, name: 'SP' },
  { id: 26, name: 'SE' },
  { id: 27, name: 'TO' },
];

function ProfileInfo({
  name, lastName, email, contact, address,
}) {
  return (
    <ProfileInfoStyle>
      <h2>Perfil</h2>
      <p>{`Nome: ${name}`}</p>
      <p>{`Sobrenome: ${lastName}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Contato: ${contact}`}</p>
      <h2>Endereço</h2>
      <p>{`Rua: ${address.street}`}</p>
      <p>{`Numero: ${address.number}`}</p>
      <p>{`CEP: ${address.zipcode}`}</p>
      <p>{`Bairro: ${address.district}`}</p>
      <p>{`Cidade: ${address.city}`}</p>
      <p>{`Estado: ${states[address.statesId - 1].name}`}</p>
      <Link to="/profile/edit">
        <button
          type="button"
        >
          Editar Perfil
        </button>
      </Link>
    </ProfileInfoStyle>
  );
}

ProfileInfo.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    statesId: PropTypes.number.isRequired,
    street: PropTypes.string.isRequired,
    zipcode: PropTypes.number.isRequired,
  }).isRequired,
  contact: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ProfileInfo;
