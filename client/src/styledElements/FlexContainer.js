import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-flow: ${props => props.column ? 'column' : 'row'};
  flex-wrap: wrap;
  justify-content: ${props => props.center ? 'center' : ''};
  align-items: center;
  padding: 10px;
`;
