import React from 'react';
import { IoMdBasketball } from 'react-icons/io';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { FlexContainer, Icon } from '../../styledElements';

const LogoContainer = styled.div`
  color: #fff;
  margin-right: 15px;
  padding-right: 15px;

  ${(props) =>
    props.border &&
    css`
      border-right: 2px solid ${(props) => props.theme.primary.hover};
    `};
`;

export default function HeaderLogo() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      <LogoContainer border={isLoggedIn}>
        <FlexContainer padding="0" align="center" justify="center">
          <Icon spaceRight spaceLeft size="2rem" height="35px">
            <IoMdBasketball />
          </Icon>
          <h4 style={{ margin: 0 }}>BesketRol</h4>
        </FlexContainer>
      </LogoContainer>
    </>
  );
}
