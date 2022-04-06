import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requests from '../services/requests';
import FormStyled from '../styles/FormStyles';
import { productValidation } from '../validation/validations';
import Image from '../images/relogio.jpg';

const categories = [
  { name: 'Acessórios para Veículos' },
  { name: 'Alimentos e Bebidas' },
  { name: 'Animais' },
  { name: 'Antiguidades e Coleções' },
  { name: 'Arte, Papelaria e Armarinho' },
  { name: 'Bebês' },
  { name: 'Beleza e Cuidado Pessoal' },
  { name: 'Brinquedos e Hobbies' },
  { name: 'Calçados, Roupas e Bolsas' },
  { name: 'Casa, Móveis e Decoração' },
  { name: 'Celulares e Telefones' },
  { name: 'Eletrodomésticos' },
  { name: 'Eletrônicos, Áudio e Vídeo' },
  { name: 'Esportes e Fitness' },
  { name: 'Ferramentas' },
  { name: 'Festas e Lembrancinhas' },
  { name: 'Games' },
  { name: 'Indústria e Comércio' },
  { name: 'Informática' },
  { name: 'Instrumentos Musicais' },
  { name: 'Livros, Revistas e Comics' },
  { name: 'Música, Filmes e Seriados' },
  { name: 'Saúde' },
  { name: 'Serviços' },
];

function ProductForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoriesId: 1,
    usersId: '',
    newProduct: '',
  });

  const handleFormData = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async () => {
    const validation = productValidation(formData);
    if (validation === true) {
      const result = await requests.createProduct({});
      if (!result.error) {
        global.alert('Produto criado com sucesso!');
        navigate('/');
      } else {
        global.alert(result.error);
      }
    } else {
      global.alert(validation);
    }
  };

  return (
    <FormStyled>
      <h2>Produto</h2>
      <img src={Image} alt="product" width="300px" />
      <label htmlFor="name">
        <input
          type="text"
          value={formData.name}
          name="name"
          placeholder="Nome"
          onChange={(event) => handleFormData(event)}
        />
      </label>
      <label htmlFor="description">
        <textarea
          value={formData.description}
          name="description"
          placeholder="Descricao"
          onChange={(event) => handleFormData(event)}
        />
      </label>
      <label htmlFor="price">
        <input
          type="email"
          value={formData.email}
          name="price"
          placeholder="1000"
          onChange={(event) => handleFormData(event)}
        />
      </label>
      <label htmlFor="newProduct">
        Novo:
        <input
          type="checkbox"
          value={formData.newProduct}
          name="password"
          placeholder="Password"
          onChange={(event) => handleFormData(event)}
        />
      </label>
      <label htmlFor="statesId">
        <select
          name="statesId"
          onChange={(event) => handleFormData(event)}
        >
          {categories.map(({ name }, index) => (
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
        onClick={submitForm}
      >
        Criar Produto
      </button>
    </FormStyled>

  );
}
export default ProductForm;
