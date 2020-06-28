import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

const LoaderContainer = styled.div`
  color: ${(props) => props.theme.generic.color};
  padding: ${(props) => props.padding + "px" || ""};
  width: 100%;
  height: ${(props) => !props.clearHeight && "100%"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ComponentLoader({ loading, size, padding, clearHeight, children }) {
  return (
    <>
      {loading ? (
        <LoaderContainer padding={padding} clearHeight={clearHeight}>
          <CircularProgress size={size || 150} color="inherit" />
        </LoaderContainer>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

ComponentLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.number,
  padding: PropTypes.string,
  clearHeight: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default React.memo(ComponentLoader);
