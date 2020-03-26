import styled, { css } from 'styled-components';

export default styled.button`
  background: ${props => (props.color ? props.theme[props.color].color : props.theme.primary.color)};
  color: #fff;
  font-family: ${props => props.theme.font};
  font-size: 0.8rem;
  font-weight: bold;
  border: none;
  border-radius: 7px;
  padding: 10px;
  margin: 0px 5px;
  transition: background 0.2s ease;
  &:hover{
    background: ${props => (props.color ? props.theme[props.color].hover : props.theme.primary.hover)};
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
  ${props => props.justifyRight && css`
    position: absolute;
    right: 15px;
  `}
`;
