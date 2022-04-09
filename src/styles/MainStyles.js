import styled from 'styled-components';

export const MainStyled = styled.main`
  padding-top: 200px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-height: 100vh;
  width: 100%;
  @media screen and (min-width: 1000px) {
    width: 60%;
  }
  @media screen and (min-width: 600px) {
    width: 80%;
  }
`;

export const HomeMainStyled = styled.main`
  padding-top: 200px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

export const RegisterMainStyled = styled.main`
  padding-top: 200px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  max-width: 700px;
  @media screen and (min-width: 550px) {
    width: 80%;
  }
  @media screen and (min-width: 1000px) {
    width: 60%;
  }
`;

export const LoginMainStyled = styled.main`
  padding-top: 200px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  @media screen and (min-width: 550px) {
    width: 50%;
  }
  @media screen and (min-width: 1000px) {
    width: 25%;
  }
`;
