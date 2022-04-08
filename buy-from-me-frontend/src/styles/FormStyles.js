import styled from 'styled-components';

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #F8961E;
  padding: 15px;
  color: #FFFFFF;
  min-width: 300px;
  width: 100%;
  input {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    border-radius: 5px;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  input:focus {
    background: #DEE2E6;
  }

  select {
    padding: 7px 40px 7px 12px;
    width: 100%;
    border: 1px solid #e8eaed;
    border-radius: 0px 0px 0px 0px;
    background: #fff;
    box-shadow: 0 1px 3px -2px #9098a9;
    cursor: pointer;
    font-size: 16px;
    transition: all 150ms ease;
    option {
      font-weight: normal;
      display: block;
      white-space: nowrap;
      min-height: 1.2em;
      padding: 0px 2px 1px;
    }
  }
`;

export default FormStyled;
