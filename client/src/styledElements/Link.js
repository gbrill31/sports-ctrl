import styled from 'styled-components';

export default styled.a`
  border: none;
  text-decoration: none;
  font-size: ${(props) => props.fontSize || '1rem'};
  cursor: pointer;
  color: ${(props) => props.color || '#fff'};
  padding: ${(props) => (props.size ? `${props.size}px` : '5px')};
`;
