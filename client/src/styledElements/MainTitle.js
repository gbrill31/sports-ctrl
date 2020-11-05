import styled, { css } from 'styled-components';

export default styled.h1`
  font-size: 2rem;
  width: 100%;
  text-align: ${(props) => props.align || 'left'};
  color: ${(props) =>
    props.theme[props.color]
      ? props.theme[props.color].color
      : props.color || '#dcdbdb'};
  padding: 15px;
  margin: ${(props) => props.margin || 'initial'};
  opacity: ${(props) => (props.soft ? '0.4' : '')};

  ${(props) =>
    props.capitalize &&
    css`
      text-transform: capitalize;
    `};
  ${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `};
`;
