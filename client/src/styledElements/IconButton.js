import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export default styled.button`
  position: ${(props) => (props.relative ? 'relative' : 'absolute')};

  background: transparent;
  cursor: pointer;
  border: none;
  color: ${(props) => props.theme[props.color]?.color || props.color || '#fff'};
  padding: 5px;
  display: ${(props) => (props.show ? 'inherit' : 'none')};
  z-index: 99;

  ${(props) =>
    !props.relative &&
    css`
      right: ${(props) => props.right || '0'};
      top: ${(props) => props.top || '15px'};
    `}

  ${(props) =>
    props.animate &&
    css`
      animation: ${fadeIn} 0.15s ease-in;
    `}
`;
