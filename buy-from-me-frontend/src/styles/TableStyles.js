import styled from 'styled-components';

const TableStyled = styled.div`
  width: 100%;
  font-size: 15px;
  text-align: center;
  td, th {
    border: 1px solid #ddd;
    padding: 8px;
    white-space: nowrap;
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
