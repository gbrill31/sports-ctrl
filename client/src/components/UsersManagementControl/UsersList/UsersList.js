import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  faCheck,
  faEdit,
  faPlus,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  FlexContainer,
  Icon,
  IconButton,
} from '../../../styledElements';

import FilterListInput from '../../FilterListInput/FilterListInput';
import useDeleteUsers from '../../../hooks/useDeleteUsers';
import PromptDialog from '../../PromptDialog/PromptDialog';
import UserRegisterForm from '../../UserRegisterForm/UserRegisterForm';
import ModalDialog from '../../ModalDialog/ModalDialog';
import Table from '../../TableDisplay/TableDisplay';
import useDb from '../../../hooks/useDb';
import useUsers from '../../../hooks/useUsers';

const RowControl = styled.div`
  overflow: hidden;
  background-color: ${(props) => props.theme.secondary.color};
  box-shadow: 0px 0px 1px #000 inset;
`;

const tableHeaders = [
  {
    id: 1,
    title: 'Name',
    sortable: true,
  },
  {
    id: 2,
    title: 'Email',
  },
  {
    id: 3,
    title: 'Type',
  },
  {
    id: 4,
    title: 'Permissions',
  },
  {
    id: 6,
    title: 'Activated',
  },
  {
    id: 7,
    title: 'Created',
    sortKey: 'created_at',
    sortable: true,
  },
  {
    id: 8,
    title: 'Edit',
  },
];

export default function UsersList() {
  const [singleUser, setSingleUser] = useState();
  const [filter, setFilter] = useState('');
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);
  const [selected, setSelected] = useState([]);

  const { status: dbStatus } = useDb();

  const { data: users } = useUsers(dbStatus === 'success');

  const openDeleteUserPrompt = () => setIsOpenDeleteUser(true);
  const closeDeleteUserPrompt = () => setIsOpenDeleteUser(false);

  const openAddUserDialog = () => setIsOpenAddUser(true);
  const closeAddUserDialog = () => setIsOpenAddUser(false);

  const editUser = useCallback(
    (user) => () => {
      setSingleUser(user);
      openAddUserDialog();
    },
    []
  );

  const deleteUsers = useDeleteUsers();

  const deleteSingleUser = useCallback(
    (user) => () => {
      setSingleUser(user);
      openDeleteUserPrompt();
    },
    []
  );

  const deleteSelectedUsers = () => {
    deleteUsers(
      selected.length ? selected.map((user) => user.id) : [singleUser.id]
    );
    setSelected([]);
    closeDeleteUserPrompt();
  };

  const getFilteredUsers = () => {
    return users.filter((user) => user.name.includes(filter));
  };

  const cells = useMemo(
    () => [
      {
        key: 'name',
      },
      {
        key: 'email',
      },
      {
        key: 'type',
      },
      {
        key: 'permissions',
        component: (data) => (
          <FlexContainer justify="center" align="center" padding="0" fullWidth>
            {Array.isArray(data) &&
              data?.map((per) => (
                <FlexContainer key={per} align="baseline" padding="0">
                  <Icon spaceRight color="success">
                    <FontAwesomeIcon icon={faCheck} size="sm" />
                  </Icon>
                  <h5 style={{ margin: 0 }}>{per}</h5>
                </FlexContainer>
              ))}
          </FlexContainer>
        ),
      },
      {
        key: 'firstLogin',
        component: (data) => (
          <>
            {!data ? (
              <Icon color="success">
                <FontAwesomeIcon icon={faCheck} size="1x" />
              </Icon>
            ) : (
              <Icon color="error">
                <FontAwesomeIcon icon={faTimes} size="1x" />
              </Icon>
            )}
          </>
        ),
      },
      {
        key: 'created_at',
        component: (data) => <>{moment(data).format('MMMM Do, YYYY')}</>,
      },
      {
        key: 'actions',
        component: (user) => (
          <RowControl>
            <FlexContainer align="center" justify="space-evenly">
              <IconButton relative show onClick={editUser(user)}>
                <Icon>
                  <FontAwesomeIcon icon={faEdit} size="1x" />
                </Icon>
              </IconButton>
              <IconButton
                relative
                show
                color="error"
                onClick={deleteSingleUser(user)}
              >
                <Icon>
                  <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                </Icon>
              </IconButton>
            </FlexContainer>
          </RowControl>
        ),
      },
    ],
    [editUser, deleteSingleUser]
  );

  return (
    <>
      {users?.length > 0 ? (
        <>
          <FlexContainer fullWidth noWrap padding="0">
            <FlexContainer width="50%" minHeight="40px" align="center">
              <Button color="success" onClick={openAddUserDialog}>
                Add Operator
                <Icon spaceLeft>
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </Icon>
              </Button>
              <FlexContainer
                padding="0"
                align="center"
                style={{ display: selected.length > 0 ? '' : 'none' }}
              >
                <h5 style={{ color: '#fff', margin: '0 5px 0 25px' }}>
                  Selected:
                </h5>
                <Button color="error" onClick={openDeleteUserPrompt}>
                  Delete
                  <Icon spaceLeft>
                    <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                  </Icon>
                </Button>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer
              width="50%"
              padding="0 10px 0 0"
              align="center"
              justify="flex-end"
            >
              <FilterListInput
                width="50%"
                placeholder="Filter By Name"
                onChange={setFilter}
              />
            </FlexContainer>
          </FlexContainer>
          <FlexContainer fullWidth>
            <Table
              items={getFilteredUsers()}
              headers={tableHeaders}
              cells={cells}
              selectable
              selected={selected}
              setSelected={setSelected}
            />
          </FlexContainer>
        </>
      ) : null}
      <PromptDialog
        isOpen={isOpenDeleteUser}
        title="Delete Users"
        content="Are you sure you want to delete selected users ?"
        confirmText="Delete"
        handleClose={closeDeleteUserPrompt}
        handleConfirm={deleteSelectedUsers}
      />
      <ModalDialog
        component={UserRegisterForm}
        componentProps={{
          userType: 'operator',
          user: singleUser,
          cb: closeAddUserDialog,
        }}
        isOpen={isOpenAddUser}
        title={`${singleUser ? 'Edit User' : 'Add User'}`}
        handleCancel={closeAddUserDialog}
      />
    </>
  );
}
