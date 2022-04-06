import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requests from '../services/requests';
import FormStyled from '../styles/FormStyles';
import { productValidation } from '../validation/validations';
import Image from '../images/relogio.jpg';
import buyFromMeContext from '../context/AppContext';

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
    }
    const { name, value } = target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const submitForm = async () => {
    const { token } = JSON.parse(localStorage.getItem('buy-from-me'));
    const validation = productValidation(productData);
    if (validation === true) {
      const result = await requests.createProduct(token, {
        ...productData,
        categoriesId: Number(productData.categoriesId),
        price: Number(productData.price),
        newProduct: productData.newProduct === 'true',
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
          name="password"
          placeholder="Password"
          onChange={(event) => handleproductData(event)}
        />
      </label>
      <label htmlFor="categoriesId">
        <select
          name="categoriesId"
          onChange={(event) => handleproductData(event)}
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
