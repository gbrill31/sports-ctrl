import styled, { keyframes, css } from 'styled-components';

const loadingAnimation = (props) => {
  return keyframes`
  from {
    border-color: ${props.color || '#444343'};
  }

  to {
    border-color: ${props.theme.success.color}
  }
`;
};

export default styled.input`
  font-size: 1rem;
  border: none;
  width: ${(props) => props.width || ''};
  border-bottom: 1px solid
    ${(props) =>
      props.error ? 'rgba(200, 0, 0, 0.9)' : props.color || '#444343'};
  color: ${(props) => props.color || '#444343'};
  background: transparent;
  padding: 15px;
  margin-bottom: 15px;
  margin-right: ${(props) => (props.spaceRight ? '10px' : '')};
  margin-left: ${(props) => (props.spaceLeft ? '10px' : '')};
  z-index: 99;
  text-align: ${(props) => props.align || ''};

  appearance: ${(props) => (props.type === 'number' ? 'textfield' : '')};
  &::-webkit-inner-spin-button {
    appearance: ${(props) => (props.type === 'number' ? 'none' : '')};
  }
  &::-webkit-outer-spin-button {
    appearance: ${(props) => (props.type === 'number' ? 'none' : '')};
  }
  &::placeholder {
    color: ${(props) =>
      props.error ? 'rgba(200, 0, 0, 0.9)' : 'rgba(150, 150, 150, 0.7)'};
  }
  ${(props) =>
    props.isLoading &&
    css`
      animation: ${(props) => loadingAnimation(props)} 0.4s alternate infinite;
    `}
  ${(props) =>
    props.disabled &&
    css`
      color: ${(props) => props.theme.disabled.color};
      border-color: ${(props) => props.theme.disabled.color};
      &:hover {
        user-select: none;
        cursor: not-allowed;
      }
    `}
`;
