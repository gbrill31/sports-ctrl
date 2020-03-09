import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  width: 90%;
  flex-flow: ${props => props.column ? 'column' : 'row'};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: #762390;
  /* border: 1px solid #762070; */
  display: inline-block;
  `;

export {
  Title,
  FlexContainer
}