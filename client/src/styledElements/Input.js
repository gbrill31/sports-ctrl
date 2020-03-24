import styled from 'styled-components';

export default styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${props => props.error ? 'rgba(200, 0, 0, 0.9)' : '#dcdbdb'};
  color: #dcdbdb;
  background: transparent;
  outline: none;
  padding: 15px;
  margin-right: ${props => props.spaceRight ? '10px' : ''};
  appearance: ${props => props.type === 'number' ? 'textfield' : ''};
  &::-webkit-inner-spin-button{
    appearance: ${props => props.type === 'number' ? 'none' : ''};
  }
  &::-webkit-outer-spin-button{
    appearance: ${props => props.type === 'number' ? 'none' : ''};
  }
  &::placeholder{
    color: ${props => props.error ? 'rgba(200, 0, 0, 0.9)' : 'rgba(150, 150, 150, 0.7)'};
  }
  `;
