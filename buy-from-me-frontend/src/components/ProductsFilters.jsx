import React, { useContext, useState } from 'react';
import buyFromMeContext from '../context/AppContext';
import { FilterBox } from '../styles/HomePageStyles';

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

function ProductsFilters() {
  const { filters, setFilters } = useContext(buyFromMeContext);
  const [values, setValues] = useState({
    price: '',
    filter: '',
  });

  const handleFilters = ({ target }) => {
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitFilter = () => {
    const { price, filter } = values;
    setFilters({
      ...filters,
      price,
      filter,
    });
  };

  const cleanFilters = () => {
    setFilters({
      name: '',
      category: '',
      newP: '',
      sold: '',
      price: '',
      filter: '',
    });

    setValues({
      price: '',
      filter: '',
    });
  };

  const submitCategory = ({ target }) => {
    if (target.name === 'newP') {
      const { name, checked } = target;
      setFilters({
        ...filters,
        [name]: checked,
      });
    }

    if (target.name === 'category') {
      const { name, value } = target;
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  return (
    <FilterBox>
      <div>
        <input
          type="text"
          placeholder="Preco"
          name="price"
          value={values.price}
          onChange={(event) => handleFilters(event)}
        />
        <label htmlFor="lte">
          Menor que
          <input
            type="radio"
            name="filter"
            value="lte"
            onChange={(event) => handleFilters(event)}
          />
        </label>
        <label htmlFor="gte">
          Maior que
          <input
            type="radio"
            name="filter"
            value="gte"
            onChange={(event) => handleFilters(event)}
          />
        </label>
        <button
          type="button"
          onClick={submitFilter}
        >
          Search
        </button>
        <button
          type="button"
          onClick={cleanFilters}
        >
          Limpar
        </button>
      </div>
      <label htmlFor="new">
        Novo
        <input
          name="newP"
          type="checkbox"
          onChange={(event) => submitCategory(event)}
        />
      </label>
      {
        categories.map(({ name }, index) => (
          <button
            type="button"
            name="category"
            value={index}
            key={name}
            onClick={(event) => submitCategory(event)}
          >
            {name}
          </button>
        ))
      }
    </FilterBox>
  );
}

export default ProductsFilters;
