import styled from 'styled-components';

export default styled.div`
  background: transparent;
  border: none;
  color: ${props => props.color || '#fff'};
  padding: ${props => props.size ? `${props.size}px` : '5px'};
`;
