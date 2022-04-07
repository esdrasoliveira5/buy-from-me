import styled from 'styled-components';

export const ProductContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductStyled = styled.div`
  img {
    width: 100%;
  }
  a {
    text-decoration: none;
    color: #023047;
  }
  width: 100%;
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
