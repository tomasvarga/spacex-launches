import styled from 'styled-components';

const CardContainer = styled.div`
  height: 100%;
  width: 500px;
  border: 1px solid #EDEDEE;
  padding: 10px;
  background: #FDFDFD;
  margin-top: 50px;
  font-size: 0.8em;
  display: flex;
  border-radius: 8px;
  cursor: pointer;

  & > div {
    margin-left: 20px;
  }

  &:hover {
    box-shadow: 5px 5px 30px 10px rgba(0,0,0,0.1);
    border: 1px solid white;
  }

`;

export default CardContainer;
