import styled from 'styled-components';

const ProfileInfoStyle = styled.main`
  background-color: rgba(33, 158, 188, 0.6);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;

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

export default ProfileInfoStyle;
