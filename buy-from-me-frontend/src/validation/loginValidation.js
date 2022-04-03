import { validate } from 'react-email-validator';

const loginValidation = ({ email, password }) => {
  const validEmail = validate(email);
  if (!validEmail) return 'Email invalido!';
  if (!password || password.length === 0) return 'Senha nao pode ser vazia';
  return true;
};

export default loginValidation;
