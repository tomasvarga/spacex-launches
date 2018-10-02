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
  overflow: auto;
  z-index: 0;

  & > div {
    margin-left: 20px;
  }

  &:hover{
    box-shadow: 5px 5px 30px 10px rgba(0,0,0,0.1);
    border: 1px solid white;
    background: none;
  }

  &:before{
    content: '';
    background: inherit; 
    filter: blur(0px);
    transition: .4s ease-in-out;
    position: inherit;
    width: 100px;
    height: 130px;
    padding: 0px;
    margin: 0px;
    position: absolute;
    z-index: -1;
  }

  &:hover::before{
    filter: blur(3px);
    transition: .4s ease-in-out;
  }

`;

export default CardContainer;
