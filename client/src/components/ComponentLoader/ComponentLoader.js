import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const LoaderContainer = styled.div`
  color: ${props => props.theme.generic.color};
  padding: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
