import React from 'react';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const UserMenuWrapper = styled.div`
  color: #fff;
  padding: 5px;
  margin-right: 10px;
`;

export default function UserMenu() {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? (
    <>
      <UserMenuWrapper>
        <FontAwesomeIcon icon={faUserCircle} />
        <h5>{user.name}</h5>
      </UserMenuWrapper>
    </>
  ) : null;
}
