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
  width: 100%;
  @media screen and (min-width: 600px) {
    width: 25%;
  }
  @media screen and (min-width: 1100px) {
    width: 15%;
  }  a {
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
    width: 100%;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

`;

export const HidenBox = styled.div`
  height: 100%;
  #profile[type=checkbox] {
    z-index: 11;
    display: none;
  }
  label {
    display: none;
  } 

  @media screen and (max-width: 1000px) {
    label {
      position: absolute;
      z-index: 9;
      display: unset;
      height: 200px;
      top: 100px;
      right: 20px;
    }
    #profile[type=checkbox]:not(:checked)+ div{
      display: none;
    }
    #profile[type=checkbox]:checked + div{
      display: flex;
      position: absolute;
      flex-direction: column;
      justify-content: center;
      background-color: #FFB703;
      left: 0%;
      right: 0%;
      top: 0%;
      bottom: 0%;
      z-index: 8;
    }
  }
`;

export const HidenBoxFilter = styled.div`
  height: 100%;
  #filter[type=checkbox] {
    z-index: 10;
    display: none;
  }
  #labelFilter {
    display: none;
  } 

  @media screen and (max-width: 600px) {
    #labelFilter {
      position: absolute;
      z-index: 9;
      display: unset;
      height: 200px;
      top: 100px;
      left: 20px;
    }

    #filter[type=checkbox]:not(:checked)+ div{
      display: none;
    }
    #filter[type=checkbox]:checked + div{
      position: absolute;
      background-color: #FFB703;
      z-index: 10;
    }
  }
`;
