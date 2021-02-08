import React from 'react';
import styled from 'styled-components';
import UserLoginForm from '../../components/UserLoginForm/UserLoginForm';

import backgroundImage from '../../img/bgCourt1.jpg';

const LoginContainer = styled.div`
  /* width: 100%; */
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};
  background-image: linear-gradient(
      to left,
      ${(props) => props.theme.primary.color} 30%,
      ${(props) => props.theme.generic.color} 100%
    ),
    url(${backgroundImage});
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  background-size: cover;
  display: grid;
  grid-template-columns: 50% 50%;
`;

export default function UserLogin() {
  return (
    <LoginContainer>
      <UserLoginForm />
    </LoginContainer>
  );
}
