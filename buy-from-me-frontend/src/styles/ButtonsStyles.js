import styled from 'styled-components';

export const ButtonRed = styled.div`
  button {
    margin-top: 10px;
    text-transform: uppercase;
    outline: 0;
    background: #e5383b;
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
  cursor: pointer;
  }
  button:hover {
    background-color: #ba181b;
  }
`;

export const ButtonGreen = styled.div`
  button {
    margin-top: 10px;
    text-transform: uppercase;
    outline: 0;
    background: #02c39a;
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  button:hover {
    background-color: #00a896;
  }
`;

export const ButtonYellow = styled.div`
  button {
    margin-top: 10px;
    text-transform: uppercase;
    outline: 0;
    background: #ffd500;
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  button:hover {
    background-color: #fdc500;
  }
`;

export const ButtonNone = styled.div`
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

export const ButtonHeader = styled.div`
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
`;
