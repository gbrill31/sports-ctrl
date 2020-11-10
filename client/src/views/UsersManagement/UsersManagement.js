import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FlexContainer, Icon, MainTitle } from '../../styledElements';
import useDb from '../../hooks/useDb';
import useUsers from '../../hooks/useUsers';
import UsersList from '../../components/UsersManagementControl/UsersList/UsersList';

const AdminCardWrapper = styled.div`
  background-color: ${(props) => props.theme.menu.hover};
  min-width: 350px;
  border-radius: 5px;

  h2,
  h4,
  h5 {
    margin: 0;
  }
`;

export default function UsersManagement() {
  const { user, permissions } = useSelector((state) => state.auth);

  const { status: dbStatus } = useDb();

  const { data: users } = useUsers(dbStatus === 'success');

  return (
    <>
      <MainTitle>Users Management</MainTitle>
      <FlexContainer justify="center">
        <AdminCardWrapper>
          <FlexContainer column align="center" justify="center">
            <FlexContainer align="baseline" justify="center">
              <MainTitle width="fit-content" color="success" padding="0 10px">
                Admin
              </MainTitle>
              <h2>{user.name}</h2>
            </FlexContainer>
            <FlexContainer padding="0">
              {permissions[user.type] &&
                permissions[user.type].map((per) => {
                  return (
                    <FlexContainer key={per} align="baseline">
                      <Icon spaceRight color="success">
                        <FontAwesomeIcon icon={faCheck} size="sm" />
                      </Icon>
                      <h5>{per}</h5>
                    </FlexContainer>
                  );
                })}
            </FlexContainer>
          </FlexContainer>
        </AdminCardWrapper>
      </FlexContainer>
      <FlexContainer>
        {users ? <UsersList users={users} /> : null}
      </FlexContainer>
    </>
  );
}
