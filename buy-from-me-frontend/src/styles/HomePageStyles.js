import styled from 'styled-components';

export const ProductContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 800px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ProductStyled = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  z-index: 1;
  a {
    text-decoration: none;
    color: #023047;
    img {
      width: 100%;
    }
    h4, p {
      visibility: hidden;
    }
  }
  a:hover {
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    transition: all 200ms ease-out;
    text-align: center;
    h4, p {
      display: block;
      visibility: visible;
    }
  }
  @media screen and (min-width: 600px) {
    width: 50%;
  }
  @media screen and (min-width: 1100px) {
    width: 25%;
  }
`;

export const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 20px;
  min-width: 250px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 15px;
  height: 800px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
    color: #023047;
  }

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
  div {
    padding: 15px;
    background: rgba(255, 255, 255, 0.2);
    label {
      display: flex;
      flex-direction: row;
    }
  }
  button {
    padding: 10px;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 20px;
  min-width: 250px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 15px;
  height: 100%;
  a {
    text-decoration: none;
    color: #023047;
  }

  div {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 15px;
    background: rgba(255, 255, 255, 0.2);
    label {
      display: flex;
      flex-direction: row;
    }
  }
  button {
    padding: 10px;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
