import styled from 'styled-components';

export default styled.div`
  display: grid;
  height: 100%;
  width: ${(props) => props.width || 'fit-content'};
  grid-template-columns: ${(props) => props.columnsSpread || 'auto'};
  grid-template-rows: ${(props) => props.rowsSpread || 'auto'};
  position: relative;
  width: ${(props) => (props.fullWidth ? '100%' : '')};
  padding: ${(props) => (props.noPadding ? '' : '50px 15px 0 15px')};
`;
