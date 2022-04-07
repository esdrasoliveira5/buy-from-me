import React from 'react';
import FooterStyled from '../styles/FooterStyles';
import github from '../images/github.png';
import linkedin from '../images/linkedin.png';

function Footer() {
  return (
    <FooterStyled>
      <p>Created by Esdras Oliveira</p>
      <div>
        <a href="https://github.com/esdrasoliveira5" target="_blank" rel="noreferrer">
          <img src={github} alt="github" />
        </a>
        <a href="https://www.linkedin.com/in/esdrasmoliveira/" target="_blank" rel="noreferrer">
          <img src={linkedin} alt="linkedin" />
        </a>
      </div>
    </FooterStyled>
  );
}

export default Footer;
