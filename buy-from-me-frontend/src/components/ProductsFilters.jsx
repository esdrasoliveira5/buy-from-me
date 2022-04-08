/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import buyFromMeContext from '../context/AppContext';
import { FilterBox, HidenBoxFilter } from '../styles/HomePageStyles';
import clear from '../images/clear.png';
import search2 from '../images/search2.png';
import Close from '../images/configClose.png';
import Config from '../images/confiOpen.png';

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
  const [menu, setMenu] = useState(true);
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

  function handlemenu() {
    setMenu(!menu);
  }

  return (
    <HidenBoxFilter>
      <label htmlFor="filter" id="labelFilter">
        <img src={menu ? Config : Close} alt="menu" width="40px" />
      </label>
      <input type="checkbox" id="filter" onClick={handlemenu} />
      <FilterBox>
        <div>
          <label htmlFor="price">
            <input
              type="text"
              placeholder="Preco"
              name="price"
              value={values.price}
              onChange={(event) => handleFilters(event)}
            />
            <button
              type="button"
              onClick={submitFilter}
            >
              <img src={search2} alt="search" width="20px" />
            </button>
            <button
              type="button"
              onClick={cleanFilters}
            >
              <img src={clear} alt="clear" width="20px" />
            </button>
          </label>
        </div>
        <div>
          <label htmlFor="lte">
            Menor
            <input
              type="radio"
              name="filter"
              value="lte"
              onChange={(event) => handleFilters(event)}
            />
          </label>
          <label htmlFor="gte">
            Maior
            <input
              type="radio"
              name="filter"
              value="gte"
              onChange={(event) => handleFilters(event)}
            />
          </label>
        </div>
        <div>
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
        </div>
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
    </HidenBoxFilter>
  );
}

export default ProductsFilters;
