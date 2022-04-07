import styled from 'styled-components';

const FooterStyled = styled.footer`
  background-color: #577590;
  padding: 20px;
  color: #F9C74F;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: absolute;
  bottom: 0;
  font-size: 18px;
  width: 100%;
  z-index: 10;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    a {
    img {
      width: 30px;
    }
  }
  }
`;

export default FooterStyled;
