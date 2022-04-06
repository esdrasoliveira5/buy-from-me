import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requests from '../services/requests';
import FormStyled from '../styles/FormStyles';
import { userValidation, addressValidation } from '../validation/validations';

const states = [
  { name: 'MG' },
  { name: 'AC' },
  { name: 'AL' },
  { name: 'AP' },
  { name: 'AM' },
  { name: 'BA' },
  { name: 'CE' },
  { name: 'DF' },
  { name: 'ES' },
  { name: 'GO' },
  { name: 'MA' },
  { name: 'MT' },
  { name: 'MS' },
  { name: 'PA' },
  { name: 'PB' },
  { name: 'PR' },
  { name: 'PE' },
  { name: 'PI' },
  { name: 'RJ' },
  { name: 'RN' },
  { name: 'RS' },
  { name: 'RO' },
  { name: 'RR' },
  { name: 'SC' },
  { name: 'SP' },
  { name: 'SE' },
  { name: 'TO' },
];
function UserForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    street: '',
    number: '',
    district: '',
    zipcode: '',
    city: '',
    statesId: 1,
  });

  const handleFormData = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForm = ({ target }) => {
    const validation = userValidation(formData);
    if (validation === true) {
      const { value } = target;
      setForm(value);
    } else {
      global.alert(validation);
    }
  };

  const submitForm = async () => {
    const validation = addressValidation(formData);
    if (validation === true) {
      const contact = Number(formData.contact);
      const zipcode = Number(formData.zipcode);
      const statesId = Number(formData.statesId);
      const result = await requests.createUser({
        ...formData,
        contact,
        zipcode,
        statesId,
      });
      if (!result.error) {
        global.alert('Usuario criado com sucesso!');
        navigate('/');
      } else {
        global.alert(result.error);
      }
    } else {
      global.alert(validation);
    }
  };

  return (
    <div>
      {
        form === 'user'
          ? (
            <FormStyled>
              <h2>Dados Pessoais</h2>
              <label htmlFor="name">
                <input
                  type="text"
                  value={formData.name}
                  name="name"
                  placeholder="Nome"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="lastName">
                <input
                  type="text"
                  value={formData.lastName}
                  name="lastName"
                  placeholder="Sobrenome"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="email">
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  placeholder="Email"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  value={formData.password}
                  name="password"
                  placeholder="Password"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="contact">
                <input
                  type="text"
                  value={formData.contact}
                  name="contact"
                  placeholder="Telefone"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <button
                type="button"
                name="form"
                value="address"
                onClick={(event) => handleForm(event)}
              >
                Proximo
              </button>
            </FormStyled>
          )
          : (
            <FormStyled>
              <h2>Endereco</h2>
              <label htmlFor="street">
                <input
                  type="text"
                  value={formData.street}
                  name="street"
                  placeholder="Rua"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="number">
                <input
                  type="text"
                  value={formData.number}
                  name="number"
                  placeholder="Numero"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="district">
                <input
                  type="text"
                  value={formData.district}
                  name="district"
                  placeholder="Bairro"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="zipcode">
                <input
                  type="text"
                  value={formData.zipcode}
                  name="zipcode"
                  placeholder="CEP"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="city">
                <input
                  type="text"
                  value={formData.city}
                  name="city"
                  placeholder="Cidade"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="statesId">
                <select
                  name="statesId"
                  onChange={(event) => handleFormData(event)}
                >
                  {states.map(({ name }, index) => (
                    <option
                      key={name}
                      value={index}
                    >
                      {name}
                    </option>
                  )) }
                </select>
              </label>
              <button
                type="button"
                name="form"
                value="user"
                onClick={(event) => handleForm(event)}
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={submitForm}
              >
                Registrar
              </button>
            </FormStyled>
          )
      }
    </div>

  );
}
export default UserForm;
