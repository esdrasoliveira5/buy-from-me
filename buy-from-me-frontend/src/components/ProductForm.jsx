import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import requests from '../services/requests';
import FormStyled from '../styles/FormStyles';
import { productValidation } from '../validation/validations';
import Image from '../images/relogio.jpg';
import buyFromMeContext from '../context/AppContext';

const categories = [
  { id: 1, name: 'Acessórios para Veículos' },
  { id: 2, name: 'Alimentos e Bebidas' },
  { id: 3, name: 'Animais' },
  { id: 4, name: 'Antiguidades e Coleções' },
  { id: 5, name: 'Arte, Papelaria e Armarinho' },
  { id: 6, name: 'Bebês' },
  { id: 7, name: 'Beleza e Cuidado Pessoal' },
  { id: 8, name: 'Brinquedos e Hobbies' },
  { id: 9, name: 'Calçados, Roupas e Bolsas' },
  { id: 10, name: 'Casa, Móveis e Decoração' },
  { id: 11, name: 'Celulares e Telefones' },
  { id: 12, name: 'Eletrodomésticos' },
  { id: 13, name: 'Eletrônicos, Áudio e Vídeo' },
  { id: 14, name: 'Esportes e Fitness' },
  { id: 15, name: 'Ferramentas' },
  { id: 16, name: 'Festas e Lembrancinhas' },
  { id: 17, name: 'Games' },
  { id: 18, name: 'Indústria e Comércio' },
  { id: 19, name: 'Informática' },
  { id: 20, name: 'Instrumentos Musicais' },
  { id: 21, name: 'Livros, Revistas e Comics' },
  { id: 22, name: 'Música, Filmes e Seriados' },
  { id: 23, name: 'Saúde' },
  { id: 24, name: 'Serviços' },
];

function ProductForm() {
  const navigate = useNavigate();
  const { logged } = useContext(buyFromMeContext);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    categoriesId: '1',
    newProduct: 'false',
  });

  const handleproductData = ({ target }) => {
    if (target.name === 'newProduct') {
      const { name, checked } = target;
      setProductData({
        ...productData,
        [name]: checked,
      });
    } else {
      const { name, value } = target;
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const submitForm = async () => {
    const { token } = JSON.parse(localStorage.getItem('buy-from-me'));
    const validation = productValidation(productData);
    if (validation === true) {
      const result = await requests.createProduct(token, {
        ...productData,
        categoriesId: Number(productData.categoriesId),
        price: Number(productData.price),
        usersId: logged.id,
      });
      if (!result.error) {
        global.alert('Produto criado com sucesso!');
        navigate('/profile/products');
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
          value={productData.name}
          name="name"
          placeholder="Nome"
          onChange={(event) => handleproductData(event)}
        />
      </label>
      <label htmlFor="description">
        <textarea
          value={productData.description}
          name="description"
          placeholder="Descricao"
          onChange={(event) => handleproductData(event)}
        />
      </label>
      <label htmlFor="price">
        <input
          type="number"
          value={productData.price}
          name="price"
          placeholder="1000"
          onChange={(event) => handleproductData(event)}
        />
      </label>
      <label htmlFor="newProduct">
        Novo:
        <input
          type="checkbox"
          value={productData.newProduct}
          name="newProduct"
          onChange={(event) => handleproductData(event)}
        />
      </label>
      <label htmlFor="categoriesId">
        <select
          name="categoriesId"
          onChange={(event) => handleproductData(event)}
          value={productData.categoriesId}
        >
          {categories.map(({ id, name }) => (
            <option
              key={name}
              value={id}
            >
              {name}
            </option>
          )) }
        </select>
      </label>
      <Link to="/profile/products">
        <button
          type="button"
        >
          Cancelar
        </button>
      </Link>
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
