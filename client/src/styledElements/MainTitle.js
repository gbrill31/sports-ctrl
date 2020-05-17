import styled from 'styled-components';

export default styled.h1`
  font-size: 2rem;
  text-align: ${props => props.align || 'left'};
  color: #dcdbdb;
  padding: 15px;
  margin: ${props => props.margin || 'initial'};
  text-transform : ${props => props.capitalize ? 'capitalize' : ''};
  `;
