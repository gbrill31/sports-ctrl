import React from 'react';
import styled, { css } from 'styled-components';

const Icon = ({ className, style, children }) => (
  <span className={className} style={style}>
    {children}
  </span>
);

export default styled(Icon)`
  ${(props) =>
    props.spaceLeft &&
    css`
      margin-left: 5px;
    `}
  ${(props) =>
    props.spaceRight &&
    css`
      margin-right: 5px;
    `}

   color: ${(props) =>
    props.theme[props.color]
      ? props.theme[props.color].color
      : props.color || 'inherit'};
`;
