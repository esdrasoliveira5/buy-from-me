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
  img {
    width: 100%;
  }
  a {
    text-decoration: none;
    color: #023047;
    text-align: center;
  }
  a:hover {
    background-color: #8ECAE6;
    }
  @media screen and (min-width: 600px) {
    width: 50%;
  }
  @media screen and (min-width: 1000px) {
    width: 25%;
  }
`;

export const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 25%;
  button{
    width: 100%;
  }
`;
