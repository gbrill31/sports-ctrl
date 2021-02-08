import React from 'react';
import styled, { css } from 'styled-components';
import { ImNotification } from 'react-icons/im';

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: center;
  width: ${(props) => props.width || '100%'};
  background-color: ${(props) =>
    props.theme[props.color]
      ? `${props.theme[props.color].color}96`
      : props.color || '#dcdbdb'};
  padding: ${(props) => props.padding || '10px'};
  margin: ${(props) => props.margin || '20px 0'};

  ${(props) =>
    props.capitalize &&
    css`
      text-transform: capitalize;
    `};
  ${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `};
`;

const NotificationIcon = styled.i`
  color: #dcdbdb;
  padding-right: 10px;
`;

const NotificationMessage = styled.div`
  color: #dcdbdb;
`;

export default ({ type, message, ...rest }) => {
  return (
    <>
      <Container color={type} {...rest}>
        <NotificationIcon>
          {type === 'success' ? <ImNotification /> : null}
        </NotificationIcon>
        <NotificationMessage>{message}</NotificationMessage>
      </Container>
    </>
  );
};
