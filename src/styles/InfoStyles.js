import styled from 'styled-components';

export const ProfileInfoStyle = styled.div`
  background-color: rgba(33, 158, 188, 0.6);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;

  button {
    margin-top: 10px;
    text-transform: uppercase;
    outline: 0;
    background: #ffd500;
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
    background-color: #fdc500;
  }

  @media screen and (min-width: 600px) {
    width: 60%;
  }
  @media screen and (min-width: 1100px) {
    width: 40%;
  }
`;

export const OrderInfoStyle = styled.div`
  background-color: rgba(33, 158, 188, 0.6);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  h3 {
    margin: 5px;
  }
  p {
    margin: 5px;
  }
  a {
    text-decoration: none;
    color: white;
  }

  @media screen and (min-width: 600px) {
    width: 60%;
  }
  @media screen and (min-width: 1100px) {
    width: 40%;
  }
`;

export const ProdutoInfoStyle = styled.div`
  background-color: rgba(251, 133, 0, 0.6);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px;
  img {
    align-self: center;
    width: 100%;
  }
  h3 {
    margin: 5px;
  }
  p {
    margin: 5px;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  a {
    text-decoration: none;
    color: white;
  }

  @media screen and (min-width: 600px) {
    width: 80%;
  }
  @media screen and (min-width: 1100px) {
    width: 50%;
  }
`;
