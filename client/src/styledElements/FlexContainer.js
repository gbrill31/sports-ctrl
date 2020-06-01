import styled, { css } from 'styled-components';

export default styled.div`
  display: flex;
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  min-width: ${props => props.minWidth ? props.minWidth + 'px' : ''};
  width: ${props => props.fullWidth ? '100%' : (props.width || '')};
  flex-flow: ${props => props.column ? 'column' : 'row'};
  flex-wrap: wrap;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  padding: ${props => props.padding || '10px'};
  overflow: ${props => props.innerScroll ? 'auto' : ''};
  border-right: ${props => props.borderRight ? '1px solid #777' : ''};
  background: ${props => props.bgColor || ''};

  ${props => props.absolute && css`
      left: ${props => props.left || '0'};
      top: ${props => props.top || '0'};
  `};
`;
