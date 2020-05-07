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
}

export default styled.button`
  background: ${props => (props.color ? props.theme[props.color].color : props.theme.primary.color)};
  color: #fff;
  font-family: ${props => props.theme.font};
  font-size: 0.8rem;
  font-weight: bold;
  border: ${props => props.rounded ? '1px solid transparent' : 'none'};
  border-radius: 7px;
  padding: 10px;
  margin: 0px 5px;
  transition: background 0.2s ease;
  position: relative;
  ${props => props.saving && css`
    animation: ${props => saving(props)} 1s alternate infinite;
  `}
  &:hover{
    background: ${props => (props.color ? props.theme[props.color].hover : props.theme.primary.hover)};
    cursor: pointer;
  };
  ${props => props.justifyRight && css`
    position: absolute;
    right: 15px;
  `};
  ${props => props.rounded && css`
    border-radius: 50%;
    width: 40px;
    height: 40px;
  `};
  ${props => props.disabled && css`
    background: ${props => props.theme.disabled.bgColor};
    color: ${props => props.theme.disabled.color};
    &:hover{
      background: #666;
      cursor: not-allowed;
    }
  `}
`;
