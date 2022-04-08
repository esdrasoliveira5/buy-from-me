import styled from 'styled-components';

const SearchBarStyle = styled.div`
  display: flex;
  flex-direction: row;
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
`;

export default SearchBarStyle;
