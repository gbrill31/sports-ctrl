import styled from "styled-components";

export default styled.button`
  /* width: 23px;
  height: 25px; */
  position: ${(props) => (props.relative ? "relative" : "absolute")};
  right: ${(props) => props.right || "0"};
  top: ${(props) => props.top || "15px"};
  background: transparent;
  cursor: pointer;
  border: none;
  color: ${(props) => props.theme[props.color]?.color || props.color || "#fff"};
  padding: 5px;
  display: ${(props) => (props.show ? "inherit" : "none")};
  z-index: 99;
`;
