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
      props.error ? 'rgba(200, 0, 0, 0.8)' : props.color || '#444343'};
  color: ${(props) => props.color || '#444343'};
  background: transparent;
  padding: 15px;
  margin-bottom: ${(props) => props.marginBottom || '15px'};
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
  &:required {
    border-bottom-color: rgba(200, 0, 0, 0.8);
  }
  &::placeholder {
    color: ${(props) =>
      props.error ? 'rgba(200, 0, 0, 0.8)' : 'rgba(150, 150, 150, 0.7)'};
  }
  ${(props) =>
    props.type === 'checkbox' &&
    css`
      appearance: none;
      position: relative;
      height: 5px;
      width: 5px;
      transition: all 0.15s ease-out 0s;
      background: #cbd1d8;
      border: ${`1px solid ${props.theme.primary.color}`};
      color: #fff;
      cursor: pointer;
      padding: 7px;
      position: relative;
      z-index: 1000;

      &:hover {
        background: ${props.theme.primary.hover};
      }
      &:indeterminate {
        background: ${props.theme.generic.color};
      }
      &:indeterminate::before {
        position: absolute;
        left: 2px;
        top: 5px;
        font-size: 30px;
        line-height: 0px;
        content: '-';
      }
      &:checked {
        background: ${props.theme.success.color};
      }

      &:checked::before {
        display: inline-block;
        font-style: normal;
        font-variant: normal;
        text-rendering: auto;
        font-family: 'Font Awesome\ 5 Free';
        font-weight: 900;
        content: '\f00c';
        position: absolute;
        left: 1px;
        font-size: 12px;
        line-height: 1px;
      }
    `}
  ${(props) =>
    props.isLoading &&
    css`
      animation: ${loadingAnimation(props)} 0.4s alternate infinite;
    `}
     ${(props) =>
    props.noMargin &&
    css`
      margin: 0;
    `}
  ${(props) =>
    props.disabled &&
    css`
      color: ${props.theme.disabled.color};
      border-color: ${props.theme.disabled.color};
      &:hover {
        user-select: none;
        cursor: not-allowed;
      }
    `}
`;
