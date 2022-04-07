import styled from 'styled-components';

export const BodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #FFB703;
  `;

export const MainStyled = styled.main`
  background-color: aliceblue;
  margin-top: 200px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  @media screen and (min-width: 1000px) {
    width: 60%;
  }
  @media screen and (min-width: 600px) {
    width: 80%;
  }
`;
