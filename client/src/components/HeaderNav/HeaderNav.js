import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { Button, Icon } from '../../styledElements';
import useDb from '../../hooks/reactQuery/useDb';

import UserMenu from '../UserMenu/UserMenu';
import HeaderLogo from '../HeaderLogo/HeaderLogo';

const NavRootContainer = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  min-height: 50px;
  top: 0;
  background-color: #c17a2b;
  padding: 10px;
  z-index: 999;
`;

function HeaderNav() {
  const history = useHistory();

  const { currentRoute } = useSelector((state) => state.routes);

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const { status: dbStatus } = useDb();

  const isDbConnected = () => dbStatus === 'success';

  const goToRoute = (route) => () => history.push(route);

  return (
    <>
      <NavRootContainer>
        <HeaderLogo />
        {isLoggedIn && !user.firstLogin && isDbConnected() ? (
          <>
            <UserMenu />
            {currentRoute !== '/' && (
              <>
                <Button color="secondary" onClick={goToRoute('/')}>
                  <Icon spaceRight>
                    <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                  </Icon>
                  Home
                </Button>
              </>
            )}
          </>
        ) : null}
      </NavRootContainer>
    </>
  );
}

export default HeaderNav;
