import { validate } from 'react-email-validator';

const loginValidation = ({ email, password }) => {
  const validEmail = validate(email);
  if (!validEmail) return 'Email invalido!';
  if (!password || password.length === 0) return 'Senha nao pode ser vazia';
  return true;
};

const userValidation = (data) => {
  const validEmail = validate(data.email);
  if (!data.name || data.name.length === 0) return 'Nome nao pode ser vazio!';
  if (!data.lastName || data.lastName.length === 0) return 'Sobrenome nao pode ser vazio!';
  if (!validEmail) return 'Email invalido!';
  if (!data.password || data.password.length < 8) return 'Senha nao pode ser menor que 8 digitos';
  if (!data.contact || data.contact.length < 11) return 'Telefone invalido!';
  return true;
};

const addressValidation = (data) => {
  if (!data.street || data.street.length === 0) return 'Rua nao pode ser vazio!';
  if (!data.number || data.number.length === 0) return 'Numero nao pode ser vazio!';
  if (!data.district || data.district.length === 0) return 'Bairro nao pode ser vazio!';
  if (!data.zipcode || data.zipcode.length < 8) return 'CEP invalido!';
  if (!data.city || data.city.length === 0) return 'Cidade nao pode ser vazio!';
  return true;
};

const productValidation = (data) => {
  if (!data.name || data.name.length === 0) return 'Nome nao pode ser vazio!';
  if (!data.description || data.description.length === 0) return 'Descricao nao pode ser vazio!';
  if (!data.price || data.price.length === 0) return 'Preco nao pode ser vazio!';
  return true;
};

export {
  loginValidation,
  userValidation,
  addressValidation,
  productValidation,
};
