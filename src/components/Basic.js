import styled from 'styled-components';

const Basic = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
  & > span {
    color: #999;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  & > img {
    margin: 0 auto;
  }
`;

export default Basic;
