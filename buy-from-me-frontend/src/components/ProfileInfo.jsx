import PropTypes from 'prop-types';
import React from 'react';

function ProfileInfo({
  name, lastName, email, contact, address,
}) {
  return (
    <div>
      <h2>Perfil</h2>
      <h3>{name}</h3>
      <p>{lastName}</p>
      <p>{email}</p>
      <p>{contact}</p>
      <h2>Endereco</h2>
      <p>{address.street}</p>
      <p>{address.number}</p>
      <p>{address.zipcode}</p>
      <p>{address.district}</p>
      <p>{address.city}</p>
      <p>{address.statesId}</p>
      <button
        type="button"
      >
        Editar Perfil
      </button>
    </div>
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
