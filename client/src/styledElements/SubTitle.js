import styled, { css } from 'styled-components';

export default styled.h2`
  font-size: ${(props) => props.size || '2rem'};
  width: ${(props) => props.width || '100%'};
  text-align: ${(props) => props.align || 'left'};
  color: ${(props) =>
    props.theme[props.color]
      ? props.theme[props.color].color
      : props.color || '#dcdbdb'};
  padding: ${(props) => props.padding || '10px'};
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
