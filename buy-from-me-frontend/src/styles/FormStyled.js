import styled from 'styled-components';

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #F8961E;
  padding: 15px;
  color: #FFFFFF;
  input {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    border-radius: 5px;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  input:focus {
    background: #DEE2E6;
  }
  button {
    margin-top: 10px;
    text-transform: uppercase;
    outline: 0;
    background: #43AA8B;
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  button:hover {
    background-color: #90BE6D;
  }
`;

export default FormStyled;
