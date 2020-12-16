import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  faSignOutAlt,
  faUsers,
  faMapMarkedAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { GiBasketballJersey } from 'react-icons/gi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { openLogoutPrompt } from '../../actions';
import { Icon, Link } from '../../styledElements';
import { useHistory } from 'react-router-dom';

import useOutsideMouseDown from '../../hooks/useOutsideMouseDown';

const UserMenuContainer = styled.div`
  color: #fff;
  padding: 5px;
  margin-right: 10px;
  position: relative;
`;

const UserInfoContainer = styled.div`
  cursor: pointer;
  padding: 8px 0;
`;

const UserIconContainer = styled.div`
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
const UserLogout = styled.h5`
  display: inline;
  margin-left: 15px;
  color: ${(props) => props.theme.secondary.color};
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.secondary.color};
  border-radius: 5px;
  padding: 5px;
  transition: background 0.1s ease-in-out, color 0.1s ease-in-out,
    border 0.1s ease-in-out;

  &:hover {
    color: #fff;
    border-color: ${(props) => props.theme.error.color};
    background-color: ${(props) => props.theme.error.color};
  }
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
  ${(props) =>
    props.current &&
    css`
      color: #fff;
      background-color: ${(props) =>
        props.theme[props.color]
          ? props.theme[props.color].hover
          : props.color || '#fbfbfb'};
    `}
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

  const logoutPrompt = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(openLogoutPrompt());
    },
    [dispatch]
  );

  const goToRoute = useCallback((route) => () => history.push(route), [
    history,
  ]);

  const MENU_ITEMS = useMemo(
    () => [
      {
        title: 'Teams',
        route: '/teams',
        color: 'primary',
        fontSize: '0.9rem',
        spacer: true,
        icon: <GiBasketballJersey />,
      },
      {
        title: 'Venues',
        route: '/venues',
        color: 'primary',
        fontSize: '0.9rem',
        spacer: true,
        icon: <FontAwesomeIcon icon={faMapMarkedAlt} size="sm" />,
      },
      {
        title: 'Users',
        route: '/users',
        color: 'primary',
        fontSize: '0.9rem',
        spacer: true,
        icon: <FontAwesomeIcon icon={faUsers} size="sm" />,
      },
    ],
    []
  );

  return isLoggedIn && !user.firstLogin ? (
    <>
      <UserMenuContainer>
        <UserInfoContainer ref={menuRef} onClick={toggleMenuOpen}>
          <UserIconContainer active={isMenuOpen} color="primary">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </UserIconContainer>
          <UserName>{user.name}</UserName>
          <UserLogout onClick={logoutPrompt}>
            Logout
            <Icon spaceLeft>
              <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
            </Icon>
          </UserLogout>
        </UserInfoContainer>
        <DropdownMenu show={isMenuOpen}>
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.title}
              color={item.color}
              onClick={item.onclick || goToRoute(item.route)}
              spacer={item.spacer}
              current={item.route === history.location.pathname}
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
      </UserMenuContainer>
    </>
  ) : null;
}
