import styled from 'styled-components';

export const BodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  background-color: #FFB703;
  `;

export const MainStyled = styled.main`
  padding-top: 200px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  @media screen and (min-width: 1000px) {
    width: 60%;
  }
  @media screen and (min-width: 600px) {
    width: 80%;
  }
`;
