import styled from 'styled-components';

const HeaderStyled = styled.header`
  font-size: 15px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: #FB8500;
  color: #577590;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    input {
      outline: 0;
      background: #f2f2f2;
      width: 80%;
      border: 0;
      border-radius: 5px 0px 0px 5px;
      padding: 13px;
      box-sizing: border-box;
      font-size: 14px;
    }
    input:focus {
      background: #DEE2E6;
    }
    button {
      width: 80px;
      outline: 0;
      background: #02c39a;
      border: 0;
      border-radius: 0px 5px 5px 0px;
      color: #FFFFFF;
      box-sizing: border-box;
      -webkit-transition: all 0.3 ease;
      transition: all 0.3 ease;
      cursor: pointer;

      img {
        width: 40px;
        height: 100%;
      }
    }
    button:hover {
      background-color: #00a896;
    }
  }
`;

export default HeaderStyled;
