import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import buyFromMeContext from '../context/AppContext';
import requests from '../services/requests';
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
function UserFormUpdate() {
  const navigate = useNavigate();
  const { logged } = useContext(buyFromMeContext);
  const [form, setForm] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
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

  useEffect(() => {
    const getUser = async () => {
      const localResponse = JSON.parse(localStorage.getItem('buy-from-me'));
      const userResponse = await requests.getUser(logged.id, localResponse.token);
      setFormData({
        name: userResponse.name,
        lastName: userResponse.lastName,
        contact: userResponse.contact,
        email: userResponse.email,
        street: userResponse.address.street,
        number: userResponse.address.number,
        district: userResponse.address.district,
        zipcode: userResponse.address.zipcode,
        city: userResponse.address.city,
        statesId: userResponse.address.statesId,
      });
    };
    getUser();
  }, []);

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
    const { token } = JSON.parse(localStorage.getItem('buy-from-me'));
    const validation = addressValidation(formData);
    if (validation === true) {
      const contact = Number(formData.contact);
      const zipcode = Number(formData.zipcode);
      const statesId = Number(formData.statesId);
      const result = await requests.updateUser(token, logged.id, {
        ...formData,
        contact,
        zipcode,
        statesId,
      });
      if (!result.error) {
        global.alert('Usuario atualizado com sucesso!');
        navigate('/login');
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
              <Link to="/profile">
                <button
                  type="button"
                >
                  Cancelar
                </button>
              </Link>
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
                  value={formData.statesId}
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
              <Link to="/profile">
                <button
                  type="button"
                >
                  Cancelar
                </button>
              </Link>
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
                Atualizar
              </button>
            </FormStyled>
          )
      }
    </div>

  );
}
export default UserFormUpdate;
