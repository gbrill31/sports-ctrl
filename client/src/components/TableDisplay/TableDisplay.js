import {
  faSortAlphaDown,
  faSortAlphaUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Input, Icon } from '../../styledElements';

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
    /* padding: 10px; */
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

export default function TableDisplay({
  items,
  headers,
  cells,
  selectable,
  selected,
  setSelected,
}) {
  const globalCheckboxRef = useRef();

  const [sortOrder, setSortOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    if (globalCheckboxRef.current) {
      globalCheckboxRef.current.indeterminate =
        selected.length > 0 && selected.length < items.length;
      globalCheckboxRef.current.checked = selected.length === items.length;
    }
  }, [selected, items]);

  useEffect(() => {
    headers.some((header) => {
      if (header.sortable) setOrderBy(header.title.toLowerCase());
      return header.sortable;
    });
  }, [headers]);

  const itemSelection = (e) => {
    const selectedId = Number(e.target.id);
    if (e.target.checked) {
      setSelected([...selected, items.find((item) => item.id === selectedId)]);
    } else {
      setSelected(selected.filter((item) => item.id !== selectedId));
    }
  };

  const isItemSelected = (id) =>
    selected.find((user) => user.id === id) !== undefined;

  const toggleSelectAll = (e) => {
    setSelected([]);
    if (e.target.checked) {
      setSelected(items);
    }
  };

  const getSortedItems = () => {
    return items.sort((userA, userB) => {
      if (sortOrder === 'asc') {
        return userA[orderBy] > userB[orderBy] ? -1 : 1;
      } else {
        return userA[orderBy] > userB[orderBy] ? 1 : -1;
      }
    });
  };

  const toggleSort = (orderBy) => () => {
    setOrderBy(orderBy.toLowerCase());
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <Table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            {selectable ? (
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
            ) : null}
            {headers?.map((header) => (
              <th
                key={header.id}
                className={header.sortable ? 'sortable' : ''}
                onClick={header.sortable ? toggleSort(header.title) : () => {}}
              >
                {header.title}
                {header.sortable && orderBy === header.title.toLowerCase() ? (
                  <Icon spaceLeft className="sortIcon">
                    {sortOrder === 'asc' ? (
                      <FontAwesomeIcon icon={faSortAlphaDown} size="sm" />
                    ) : (
                      <FontAwesomeIcon icon={faSortAlphaUp} size="sm" />
                    )}
                  </Icon>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getSortedItems().map((item) => (
            <TableRow selected={isItemSelected(item.id)} key={item.id}>
              {selectable ? (
                <td>
                  <Input
                    marginBottom="0"
                    type="checkbox"
                    id={`${item.id}`}
                    name={`user-${item.id}-selected`}
                    checked={isItemSelected(item.id)}
                    onChange={itemSelection}
                  />
                </td>
              ) : null}
              {cells.map((cell, idx) => (
                <td key={idx} style={cell.style || {}}>
                  {cell.component
                    ? cell.component(item[cell.key] ? item[cell.key] : item)
                    : item[cell.key]}
                </td>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}
