import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const LoaderContainer = styled.div`
  color: ${props => props.theme.generic.color};
  padding: ${props => props.padding + 'px' || ''};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ComponentLoader({ loading, size, padding, children }) {
  return (
    <>
      {
        loading ? (
          <LoaderContainer padding={padding}>
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
