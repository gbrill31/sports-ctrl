import styled, { css } from 'styled-components';

export default styled.a`
  border: none;
  text-decoration: none;
  font-size: ${(props) => props.fontSize || '1rem'};
  cursor: pointer;
  color: ${(props) =>
    props.theme[props.color]
      ? props.theme[props.color].color
      : props.color || '#fff'};
  padding: ${(props) => (props.padding ? `${props.padding}px` : '5px')};

  ${(props) =>
    props.withHover &&
    css`
      &:hover {
        color: #fff;
        background-color: ${props.theme[props.color]
          ? props.theme[props.color].color
          : props.color || '#fbfbfb'};
      }
    `}
`;
