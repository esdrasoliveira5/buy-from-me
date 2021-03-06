import styled from 'styled-components';
import background from '../images/background.png';

const BodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  background-color: #FFB703;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  `;

export default BodyStyled;
