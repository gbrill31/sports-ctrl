import styled, { css, keyframes } from 'styled-components';

const saving = (props) => {
  return keyframes`
  from {
    background: #666;
  }

  to {
    background: ${props.theme[props.color].color};
  }
`;
};

export default styled.button`
  background: ${(props) =>
    props.color ? props.theme[props.color].color : props.theme.primary.color};
  color: #fff;
  width: ${(props) => (props.fullWidth ? '100%' : props.width || '')};
  height: ${(props) => props.height || ''};
  font-family: ${(props) => props.theme.font};
  font-size: 0.8rem;
  font-weight: bold;
  border: ${(props) => (props.rounded ? '1px solid transparent' : 'none')};
  border-radius: ${(props) => (!props.noRaduis ? '7px' : '')};
  padding: 10px;
  margin: ${(props) => props.margin || '0px 5px'};
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
  position: relative;
  z-index: 99;
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : '')};

  ${(props) =>
    props.saving &&
    css`
      animation: ${saving(props)} 1s alternate infinite;
    `}
  &:hover {
    background: ${(props) =>
      props.color ? props.theme[props.color].hover : props.theme.primary.hover};
    cursor: pointer;
    color: ${(props) =>
      props.color === 'menu' ? props.theme[props.color].color : ''};
  }
  ${(props) =>
    props.active &&
    css`
      background: ${props.color
        ? props.theme[props.color].hover
        : props.theme.primary.hover};
      color: ${props.color === 'menu' ? props.theme[props.color].color : ''};
    `};
  ${(props) =>
    props.justifyRight &&
    css`
      position: absolute;
      right: 25px;
    `};
  ${(props) =>
    props.spaceTop &&
    css`
      margin-top: 15px;
    `};
  ${(props) =>
    props.rounded &&
    css`
      border-radius: 50%;
      width: 40px;
      height: 40px;
    `};
  ${(props) =>
    props.disabled &&
    css`
      background: ${props.theme.disabled.bgColor};
      color: ${props.theme.disabled.color};
      &:hover {
        background: #666;
        cursor: not-allowed;
      }
    `}
`;
