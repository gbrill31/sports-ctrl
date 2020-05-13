import styled from 'styled-components';

export default styled.div`
  width: ${props => props.fullWidth ? '100%' : 'fit-content'};
  height: calc(100vh - ${props => props.heightDiff + 'px'});
  padding: ${props => props.padding || '0'};
  overflow: hidden;
  overflow-y: auto;
`;