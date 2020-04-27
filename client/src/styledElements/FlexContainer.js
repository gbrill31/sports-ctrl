import styled from 'styled-components';

export default styled.div`
  display: flex;
  position: relative;
  width: ${props => props.fullWidth ? '100%' : ''};
  flex-flow: ${props => props.column ? 'column' : 'row'};
  flex-wrap: wrap;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};;
  padding: 10px;
`;
