import React, { useEffect, useState } from 'react';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FlexContainer, Icon, MainTitle, Button } from '../../styledElements';
import UserRegisterFrom from '../../components/UserRegisterForm/UserRegisterForm';
import useDb from '../../hooks/useDb';
import useUsers from '../../hooks/useUsers';
import UsersList from '../../components/UsersManagementControl/UsersList/UsersList';
import ModalDialog from '../../components/ModalDialog/ModalDialog';

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

const PERMISSIONS = {
  admin: ['Users', 'Teams', 'Venues', 'Game Control'],
  operator: ['Game Control'],
};

export default function UsersManagement() {
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);
  const { user, isSignupSuccess } = useSelector((state) => state.auth);

  const { status: dbStatus } = useDb();

  const { data: users } = useUsers(dbStatus === 'success');

  const openAddUserDialog = () => setIsOpenAddUser(true);
  const closeAddUserDialog = () => setIsOpenAddUser(false);

  useEffect(() => {
    if (isSignupSuccess) closeAddUserDialog();
  }, [isSignupSuccess]);

  return (
    <>
      <MainTitle>Users Management</MainTitle>
      <FlexContainer>
        <AdminCardWrapper>
          <FlexContainer align="center">
            <h2>{user.name}</h2>
            <FlexContainer padding="0 0 0 15px">
              {PERMISSIONS[user.type] &&
                PERMISSIONS[user.type].map((per) => {
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
        <FlexContainer fullWidth>
          <Button color="success" onClick={openAddUserDialog}>
            Add Operator
            <Icon spaceLeft>
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </Icon>
          </Button>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer>
        {users ? <UsersList users={users} permissions={PERMISSIONS} /> : null}
      </FlexContainer>
      <ModalDialog
        component={UserRegisterFrom}
        componentProps={{ userType: 'operator' }}
        isOpen={isOpenAddUser}
        title="Add User"
        handleCancel={closeAddUserDialog}
      />
    </>
  );
}
