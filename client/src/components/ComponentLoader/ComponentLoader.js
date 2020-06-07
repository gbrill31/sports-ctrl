import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const LoaderContainer = styled.div`
  color: ${props => props.theme.generic.color};
  /* padding: 0 35px; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ComponentLoader({ loading, size, children }) {
  return (
    <>
      {
        loading ? (
          <LoaderContainer>
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
