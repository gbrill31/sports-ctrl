import React from 'react';
import styled, { css } from 'styled-components';

const Icon = ({ className, children }) => (
  <span className={className}>
    {children}
  </span>
);

export default styled(Icon)`
  ${props => props.spaceLeft && css`
    margin-left: 5px;
  `}
  ${props => props.spaceRight && css`
    margin-right: 5px;
  `}
`;
