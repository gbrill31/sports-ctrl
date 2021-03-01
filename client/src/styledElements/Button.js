import React from 'react';
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

const loaderFigure = (props) => keyframes`
  0% {
    height: 0;
    width: 0;
    background-color: ${props.theme.success.color};
  }
  29% {
    background-color: ${props.theme.success.hover};
  }
  30% {
    height: 4em;
    width: 4em;
    background-color: transparent;
    border-width: 1em;
    opacity: 1;
  }
  100% {
    height: 4em;
    width: 4em;
    border-width: 0;
    opacity: 0;
    background-color: transparent;
  }
`;

const Button = styled.button`
  background: ${(props) =>
    props.color ? props.theme[props.color].color : props.theme.primary.color};
  color: #fff;
  width: ${(props) => (props.fullWidth ? '100%' : props.width || '')};
  height: ${(props) => props.height || ''};
  font-family: ${(props) => props.theme.font};
  font-size: 0.8rem;
  font-weight: bold;
  border: ${(props) => (props.rounded ? '1px solid transparent' : 'none')};
  border-radius: ${(props) => (!props.noRadius ? '7px' : '')};
  padding: 10px;
  margin: ${(props) => props.margin || '0px 5px'};
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
  position: relative;
  z-index: 99;
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : '')};
  overflow: hidden;

  ${(props) =>
    props.saving &&
    css`
      /* animation: ${saving(props)} 1s alternate infinite; */
      background: ${props.theme.disabled.bgColor};
      color: ${props.theme.disabled.color};
      &:hover {
        background: #666;
        cursor: not-allowed;
      }
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

const Loader = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  /* padding-top: 2em; */
  /* height: 0; */
  /* width: 2em; */
`;

const LoaderFigure = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 0;
  width: 0;
  box-sizing: border-box;
  border: 0 solid #fff;
  border-radius: 50%;
  animation: ${(props) => loaderFigure(props)} 1.15s infinite
    cubic-bezier(0.215, 0.61, 0.355, 1);
`;

export default ({ className, style, children, ...rest }) => {
  const { saving, color } = rest;
  return (
    <Button className={className} style={style} {...rest}>
      {children}
      {saving ? (
        <Loader>
          <LoaderFigure color={color} />
        </Loader>
      ) : null}
    </Button>
  );
};
