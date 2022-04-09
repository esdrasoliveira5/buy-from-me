import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import requests from '../services/requests';
import { ButtonGreen, ButtonRed, ButtonYellow } from '../styles/ButtonsStyles';
import FormStyled from '../styles/FormStyles';
import { userValidation, addressValidation } from '../validation/validations';

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
function UserForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    contact: '',
    street: '',
    number: '',
    district: '',
    zipcode: '',
    city: '',
    statesId: '1',
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
        navigate('/login');
      } else if (result.error === 'user already registered') {
        global.alert('Email ja Cadastrado');
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
                  placeholder="Senha"
                  onChange={(event) => handleFormData(event)}
                />
              </label>
              <label htmlFor="confirm">
                <input
                  type="password"
                  value={formData.confirm}
                  name="confirm"
                  placeholder="Confirme a senha"
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
              <ButtonRed>
                <Link to="/login">
                  <button
                    type="button"
                  >
                    Cancelar
                  </button>
                </Link>
              </ButtonRed>
              <ButtonGreen>
                <button
                  type="button"
                  name="form"
                  value="address"
                  onClick={(event) => handleForm(event)}
                >
                  Próximo
                </button>
              </ButtonGreen>
            </FormStyled>
          )
          : (
            <FormStyled>
              <h2>Endereço</h2>
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
                  placeholder="Número"
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
                  {states.map(({ id, name }) => (
                    <option
                      key={name}
                      value={id}
                    >
                      {name}
                    </option>
                  )) }
                </select>
              </label>
              <ButtonRed>
                <Link to="/login">
                  <button
                    type="button"
                  >
                    Cancelar
                  </button>
                </Link>
              </ButtonRed>
              <ButtonYellow>
                <button
                  type="button"
                  name="form"
                  value="user"
                  onClick={(event) => handleForm(event)}
                >
                  Anterior
                </button>
              </ButtonYellow>
              <ButtonGreen>
                <button
                  type="button"
                  onClick={submitForm}
                >
                  Registrar
                </button>
              </ButtonGreen>
            </FormStyled>
          )
      }
    </div>

  );
}
export default UserForm;
