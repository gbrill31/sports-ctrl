import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  flex-flow: ${props => props.flexColumn ? 'column' : 'row'};
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
  ControlsContainer
}