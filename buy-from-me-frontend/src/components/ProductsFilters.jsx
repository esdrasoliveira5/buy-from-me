import React, { useContext, useState } from 'react';
import buyFromMeContext from '../context/AppContext';
import { FilterBox } from '../styles/HomePageStyles';

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
    const { name, value } = target;
    setFilters({
      ...filters,
      [name]: value,
    });
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
          type="radio"
          checked={filters.newP === 'true'}
          value="true"
          onChange={(event) => submitCategory(event)}
        />
        Usado
        <input
          name="newP"
          type="radio"
          value="false"
          checked={filters.newP === 'false'}
          onChange={(event) => submitCategory(event)}
        />
        Todos
        <input
          name="newP"
          type="radio"
          value=""
          checked={filters.newP === ''}
          onChange={(event) => submitCategory(event)}
        />
      </label>
      {
        categories.map(({ id, name }) => (
          <button
            type="button"
            name="category"
            value={id}
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
