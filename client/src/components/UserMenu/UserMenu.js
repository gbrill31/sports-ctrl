import React, { useCallback, useRef, useState } from 'react';
import {
  faUserCircle,
  faSignOutAlt,
  faUsers,
  faMapMarkedAlt,
  faTshirt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { openLogoutPrompt } from '../../actions';
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
  padding: 8px 0;
`;

const UserIconWrapper = styled.div`
  display: inline;
  padding: 10px 5px;

  ${(props) =>
    props.active &&
    props.color &&
    css`
      background-color: ${(props) => props.theme[props.color].color};
    `}

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

  const logoutPrompt = useCallback(() => dispatch(openLogoutPrompt()), [
    dispatch,
  ]);

  const goToRoute = (route) => () => history.push(route);

  const MENU_ITEMS = [
    {
      title: 'Teams',
      color: 'primary',
      fontSize: '0.9rem',
      spacer: true,
      icon: <FontAwesomeIcon icon={faTshirt} size="sm" />,
      onclick: goToRoute('/teams'),
    },
    {
      title: 'Venues',
      color: 'primary',
      fontSize: '0.9rem',
      spacer: true,
      icon: <FontAwesomeIcon icon={faMapMarkedAlt} size="sm" />,
      onclick: goToRoute('/venues'),
    },
    {
      title: 'Users',
      color: 'primary',
      fontSize: '0.9rem',
      spacer: true,
      icon: <FontAwesomeIcon icon={faUsers} size="sm" />,
      onclick: goToRoute('/users'),
    },
    {
      title: 'Logout',
      color: 'error',
      fontSize: '0.9rem',
      spacer: false,
      icon: <FontAwesomeIcon icon={faSignOutAlt} size="sm" />,
      onclick: logoutPrompt,
    },
  ];

  return isLoggedIn ? (
    <>
      <UserMenuWrapper>
        <UserInfoWrapper ref={menuRef} onClick={toggleMenuOpen}>
          <UserIconWrapper active={isMenuOpen} color="primary">
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </UserIconWrapper>
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
              <Icon spaceRight spaceLeft>
                {item.icon}
              </Icon>
              <Link
                padding="0"
                margin="0"
                color="inherit"
                fontSize={item.fontSize}
              >
                <span style={{ marginLeft: '5px' }}>{item.title}</span>
              </Link>
            </MenuItem>
          ))}
        </DropdownMenu>
      </UserMenuWrapper>
    </>
  ) : null;
}
