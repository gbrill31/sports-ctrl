import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import {
  faCheck,
  faEdit,
  faPlus,
  faSortAlphaDown,
  faSortAlphaUp,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  FlexContainer,
  Icon,
  IconButton,
  Input,
} from '../../../styledElements';

import FilterListInput from '../../FilterListInput/FilterListInput';
import useDeleteUsers from '../../../hooks/useDeleteUsers';
import PromptDialog from '../../PromptDialog/PromptDialog';
import UserRegisterForm from '../../UserRegisterForm/UserRegisterForm';
import ModalDialog from '../../ModalDialog/ModalDialog';
import { useSelector } from 'react-redux';

const Table = styled.table`
  background-color: ${(props) => props.theme.basic.color};
  width: 100%;
  text-align: center;
  border-collapse: collapse;

  .sortable {
    cursor: pointer;
  }

  th {
    padding: 5px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  td {
    padding: 10px;
    border-right: 1px solid #000;
    position: relative;
  }
`;

const TableRow = styled.tr`
  position: relative;

  &:nth-child(2n) {
    background-color: ${(props) =>
      !props.selected ? props.theme.basic.odd : ''};
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: ${(props) => props.theme.primary.hover};
      color: #fff;
      transition: background-color 0.2s ease-in-out;
    `}
`;

const RowControl = styled.td`
  position: absolute;
  overflow: hidden;
  background-color: ${(props) => props.theme.secondary.color};
  height: 43px;
  width: fit-content;
  min-width: 100px;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 1px #000 inset;
`;

export default function UsersList({ users }) {
  const globalCheckboxRef = useRef();

  const [selected, setSelected] = useState([]);
  const [singleUser, setSingleUser] = useState();
  const [filter, setFilter] = useState('');
  const [nameSort, setNameSort] = useState('asc');
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);

  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    globalCheckboxRef.current.indeterminate =
      selected.length > 0 && selected.length < users.length;
    globalCheckboxRef.current.checked = selected.length === users.length;
  }, [selected, users]);

  const openDeleteUserPrompt = () => setIsOpenDeleteUser(true);
  const closeDeleteUserPrompt = () => setIsOpenDeleteUser(false);

  const openAddUserDialog = () => setIsOpenAddUser(true);
  const closeAddUserDialog = () => setIsOpenAddUser(false);

  const editUser = (user) => () => {
    setSingleUser(user);
    openAddUserDialog();
  };

  const deleteUsers = useDeleteUsers();

  const deleteSingleUser = (user) => () => {
    setSingleUser(user);
    openDeleteUserPrompt();
  };

  const deleteSelectedUsers = () => {
    deleteUsers(
      selected.length ? selected.map((user) => user.id) : [singleUser.id]
    );
    setSelected([]);
    closeDeleteUserPrompt();
  };

  const userSelection = (e) => {
    const selectedId = Number(e.target.id);
    if (e.target.checked) {
      setSelected([...selected, users.find((user) => user.id === selectedId)]);
    } else {
      setSelected(selected.filter((user) => user.id !== selectedId));
    }
  };

  const isUserSelected = (id) =>
    selected.find((user) => user.id === id) !== undefined;

  const toggleSelectAll = (e) => {
    setSelected([]);
    if (e.target.checked) {
      setSelected(users);
    }
  };

  const toggleNameSort = () => setNameSort(nameSort === 'asc' ? 'desc' : 'asc');

  const getFilteredUsers = () => {
    return users
      .filter((user) => user.name.includes(filter))
      .sort((userA, userB) => {
        if (nameSort === 'asc') {
          return userA > userB ? -1 : 1;
        } else {
          return userA > userB ? 1 : -1;
        }
      });
  };

  return (
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
            <h5 style={{ color: '#fff', margin: '0 5px 0 25px' }}>Selected:</h5>
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
        <Table>
          <thead>
            <tr>
              <th>
                <Input
                  ref={globalCheckboxRef}
                  marginBottom="0"
                  type="checkbox"
                  id="select-all"
                  name="select-all"
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="sortable" onClick={toggleNameSort}>
                Full Name
                <Icon spaceLeft>
                  {nameSort === 'asc' ? (
                    <FontAwesomeIcon icon={faSortAlphaDown} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faSortAlphaUp} size="sm" />
                  )}
                </Icon>
              </th>
              <th>Email</th>
              <th>Type</th>
              <th>Permissions</th>
              <th>Activated</th>
              <th>Created</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredUsers().map((user) => (
              <TableRow selected={isUserSelected(user.id)} key={user.id}>
                <td>
                  <Input
                    marginBottom="0"
                    type="checkbox"
                    id={`${user.id}`}
                    name={`user-${user.id}-selected`}
                    checked={isUserSelected(user.id)}
                    onChange={userSelection}
                  />
                </td>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                  <FlexContainer
                    justify="center"
                    align="center"
                    padding="0"
                    fullWidth
                  >
                    {permissions[user.type] &&
                      permissions[user.type].map((per) => (
                        <FlexContainer key={per} align="baseline" padding="0">
                          <Icon spaceRight color="success">
                            <FontAwesomeIcon icon={faCheck} size="sm" />
                          </Icon>
                          <h5 style={{ margin: 0 }}>{per}</h5>
                        </FlexContainer>
                      ))}
                  </FlexContainer>
                </td>
                <td>
                  {!user.firstLogin ? (
                    <Icon color="success">
                      <FontAwesomeIcon icon={faCheck} size="1x" />
                    </Icon>
                  ) : (
                    <Icon color="error">
                      <FontAwesomeIcon icon={faTimes} size="1x" />
                    </Icon>
                  )}
                </td>
                <td>{moment(user.created_at).format('MMMM Do, YYYY')}</td>
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
              </TableRow>
            ))}
          </tbody>
        </Table>
      </FlexContainer>
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
