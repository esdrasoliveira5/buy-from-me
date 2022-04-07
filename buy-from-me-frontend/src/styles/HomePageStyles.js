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
  height: 100%;
  width: 25%;
  button{
    width: 100%;
  }
`;
