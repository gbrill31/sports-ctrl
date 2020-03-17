import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-flow: ${props => props.column ? 'column' : 'row'};
  flex-wrap: wrap;
  justify-content: ${props => props.center ? 'center' : ''};
  align-items: center;
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 1.5em;
  text-align: left;
  color: #762390;
  padding: 15px;
  `;

export {
  Title,
  FlexContainer
}