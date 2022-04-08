import PropTypes from 'prop-types';
import React from 'react';
import categoryImage from '../services/categoryImage';

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

function ProductInfo({
  name, description, price, newP, category,
}) {
  return (
    <div>
      <img src={categoryImage(category)} alt={name} width="400px" />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{`R$ ${price}`}</p>
      <p>{newP ? 'Novo' : 'Usado'}</p>
      <p>{categories[category - 1].name}</p>
    </div>
  );
}

ProductInfo.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  newP: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.number.isRequired,
};

export default ProductInfo;
