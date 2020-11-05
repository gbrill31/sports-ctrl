import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  faSortAlphaDown,
  faSortAlphaUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexContainer, Icon, Input } from '../../../styledElements';

import FilterListInput from '../../FilterListInput/FilterListInput';

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
  tr {
    &:nth-child(2) {
      background-color: ${(props) => props.theme.basic.odd};
    }
  }
  td {
    padding: 10px;
    border-right: 1px solid #000;
  }
`;

export default function UsersList({ users, permissions }) {
  const globalCheckboxRef = useRef();

  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState('');
  const [nameSort, setNameSort] = useState('asc');

  useEffect(() => {
    globalCheckboxRef.current.indeterminate =
      selected.length > 0 && selected.length < users.length;
    globalCheckboxRef.current.checked = selected.length === users.length;
  }, [selected, users]);

  const userSelection = (e) => {
    const selectedId = Number(e.target.id);
    if (e.target.checked) {
      setSelected([...selected, users.find((user) => user.id === selectedId)]);
    } else {
      setSelected(selected.filter((user) => user.id !== selectedId));
    }
  };

  const checkUserSelected = (id) =>
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
      <FlexContainer>
        <FilterListInput placeholder="Filter By Name" onChange={setFilter} />
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
            </tr>
          </thead>
          <tbody>
            {getFilteredUsers().map((user) => (
              <tr key={user.id}>
                <td>
                  <Input
                    marginBottom="0"
                    type="checkbox"
                    id={`${user.id}`}
                    name={`user-${user.id}-selected`}
                    checked={checkUserSelected(user.id)}
                    onChange={userSelection}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>{permissions[user.type]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </FlexContainer>
    </>
  );
}
