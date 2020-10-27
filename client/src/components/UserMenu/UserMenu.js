import React, { useCallback, useRef, useState } from 'react';
import {
  faUserCircle,
  faSignOutAlt,
  faUsers,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { userLogout } from '../../actions';
import { Icon, Link } from '../../styledElements';
import { useHistory } from 'react-router-dom';

import useOutsideMouseDown from '../../hooks/useOutsideMouseDown';

const UserMenuWrapper = styled.div`
  color: #fff;
  padding: 5px;
  margin-right: 10px;
  position: relative;
`;

const UserInfoWrapper = styled.div`
  cursor: pointer;
  padding: 5px 20px;

  background-color: ${(props) =>
    props.active ? props.theme[props.color].color : ''};

  transition: background-color 0.1s ease-in-out;
`;

const UserName = styled.h5`
  display: inline;
  margin-left: 5px;
`;

const DropdownMenu = styled.div`
  max-height: 0;
  transition: max-height 0.2s ease-in-out;
  z-index: 99;
  position: absolute;
  overflow: hidden;
  left: 5px;
  width: 120px;
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);

  ${(props) =>
    props.show &&
    css`
      max-height: 500px;
    `}
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 7px 0;
  width: 100%;
  cursor: pointer;
  color: ${(props) =>
    props.theme[props.color]
      ? props.theme[props.color].color
      : props.color || '#fff'};

  border-bottom: ${(props) => (props.spacer ? '1px solid #000' : 'none')};
  margin-top: ${(props) => (props.topSpace ? '5px' : '')};
  &:hover {
    color: #fff;
    background-color: ${(props) =>
      props.theme[props.color]
        ? props.theme[props.color].color
        : props.color || '#fbfbfb'};
  }
`;

export default function UserMenu() {
  const dispatch = useDispatch();
  const history = useHistory();

  const menuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useOutsideMouseDown(menuRef, isMenuOpen, () => {
    setIsMenuOpen(false);
  });

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const toggleMenuOpen = () => setIsMenuOpen(!isMenuOpen);

  const logout = useCallback(() => dispatch(userLogout()), [dispatch]);

  const goToRoute = (route) => () => history.push(route);

  const MENU_ITEMS = [
    {
      title: 'Teams',
      color: 'primary',
      fontSize: '0.9rem',
      spacer: true,
      icon: () => (
        <Icon spaceRight>
          <FontAwesomeIcon icon={faUsers} size="sm" />
        </Icon>
      ),
      onclick: goToRoute('/teams'),
    },
    {
      title: 'Venues',
      color: 'primary',
      fontSize: '0.9rem',
      spacer: true,
      icon: () => (
        <Icon spaceRight>
          <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />
        </Icon>
      ),
      onclick: goToRoute('/venues'),
    },
    {
      title: 'Logout',
      color: 'error',
      fontSize: '0.9rem',
      spacer: false,
      icon: () => (
        <Icon spaceRight>
          <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
        </Icon>
      ),
      onclick: logout,
    },
  ];

  return isLoggedIn ? (
    <>
      <UserMenuWrapper>
        <UserInfoWrapper
          ref={menuRef}
          onClick={toggleMenuOpen}
          color="primary"
          active={isMenuOpen}
        >
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
          <UserName>{user.name}</UserName>
        </UserInfoWrapper>
        <DropdownMenu show={isMenuOpen}>
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.title}
              color={item.color}
              onClick={item.onclick}
              spacer={item.spacer}
            >
              {item.icon()}
              <Link
                padding="0"
                margin="0"
                color="inherit"
                fontSize={item.fontSize}
              >
                {item.title}
              </Link>
            </MenuItem>
          ))}
        </DropdownMenu>
      </UserMenuWrapper>
    </>
  ) : null;
}
