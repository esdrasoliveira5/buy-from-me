import styled from 'styled-components';

const TableStyled = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  font-size: 15px;
  text-align: center;
  td, th {
    border: 1px solid #ddd;

    @media screen and (min-width: 600px) {
      white-space: nowrap;
      padding: 8px;
    }
  }
  th {
    background-color: rgb(251, 133, 0);
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    color: white;
  }

  td {
    background-color: rgba(142, 202, 230, 0.6);
  }

  tr:nth-child(even){background-color: rgb(142, 202, 230);}
  tr:hover {background-color: rgb(33, 158, 188);}

`;

export default TableStyled;
