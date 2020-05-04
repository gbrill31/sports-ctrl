import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: ${props => props.columnsSpread || 'auto'};
  position: relative;
  width: ${props => props.fullWidth ? '100%' : ''};
`;
