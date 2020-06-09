import styled from 'styled-components';

export default styled.button`
  position: absolute;
  right: 0;
  top: 15px;
  background: transparent;
  cursor: pointer;
  border: none;
  color: ${props => props.color || '#fff'};
  padding: 5px;
  display: ${props => props.show ? 'inherit' : 'none'};
  z-index: 99;
`;
