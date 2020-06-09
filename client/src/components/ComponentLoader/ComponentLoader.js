import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const LoaderContainer = styled.div`
  color: ${props => props.theme.generic.color};
  padding: ${props => props.padding + 'px' || ''};
  width: 100%;
  height: ${props => !props.clearHeight && '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ComponentLoader({ loading, size, padding, clearHeight, children }) {
  return (
    <>
      {
        loading ? (
          <LoaderContainer padding={padding} clearHeight={clearHeight}>
            <CircularProgress size={size || 150} color="inherit" />
          </LoaderContainer>
        ) : (
            <>
              {children}
            </>
          )
      }
    </>
  )
}
