import {
  faSortAlphaDown,
  faSortAlphaUp,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Input, Icon, IconButton } from '../../styledElements';
import moment from 'moment';

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
    font-size: 1.5rem;
    text-transform: uppercase;
  }
  td {
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

const TablePageControl = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 10px;
`;

export default function TableDisplay({
  items,
  headers,
  cells,
  selectable,
  selected,
  setSelected,
  cellsStyle = {},
  maxRows = 10,
}) {
  const globalCheckboxRef = useRef();

  const [sortOrder, setSortOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('');
  const [itemsIndex, setItemsIndex] = useState(0);
  const [rowsPage, setRowsPage] = useState(1);

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
    selected.find((item) => item.id === id) !== undefined;

  const toggleSelectAll = (e) => {
    setSelected([]);
    if (e.target.checked) {
      setSelected(items);
    }
  };

  const getRowsByIndex = () => {
    return items.slice(itemsIndex, itemsIndex + maxRows);
  };

  const isValidDate = (d) => {
    const test = new Date(d);
    return test instanceof Date && !isNaN(test);
  };

  const getSortedItems = () => {
    return getRowsByIndex().sort((itemA, itemB) => {
      if (sortOrder === 'asc') {
        if (isValidDate(itemA[orderBy]))
          return moment(itemA[orderBy]).isAfter(itemB[orderBy]) ? -1 : 1;
        return itemA[orderBy] > itemB[orderBy] ? -1 : 1;
      } else {
        if (isValidDate(itemA[orderBy]))
          return moment(itemA[orderBy]).isBefore(itemB[orderBy]) ? -1 : 1;
        return itemA[orderBy] > itemB[orderBy] ? 1 : -1;
      }
    });
  };

  const toggleSort = (newOrderBy) => () => {
    setOrderBy(newOrderBy.toLowerCase());
    if (newOrderBy.toLowerCase() === orderBy)
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getRowsMaxIndex = () =>
    itemsIndex + maxRows < items.length ? itemsIndex + maxRows : items.length;

  const prevPage = () => {
    setItemsIndex(itemsIndex - maxRows);
    setRowsPage(rowsPage - 1);
  };

  const nextPage = () => {
    setItemsIndex(itemsIndex + maxRows);
    setRowsPage(rowsPage + 1);
  };

  return items?.length > 0 ? (
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
                onClick={
                  header.sortable
                    ? toggleSort(header.sortKey || header.title)
                    : () => {}
                }
              >
                {header.title}
                {(header.sortable &&
                  orderBy === header.sortKey?.toLowerCase()) ||
                orderBy === header.title.toLowerCase() ? (
                  <Icon spaceLeft className="sortIcon">
                    {sortOrder !== 'asc' ? (
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
          {getSortedItems().map((item, idx) => (
            <TableRow
              selected={selectable ? isItemSelected(item.id) : false}
              key={item.id}
            >
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
              {cells.map((cell, idx) => {
                return (
                  <td
                    key={idx}
                    style={
                      cellsStyle
                        ? Object.assign({}, cellsStyle, cell.style)
                        : cellsStyle
                    }
                  >
                    {cell.component
                      ? cell.component(item[cell.key], item)
                      : item[cell.key]}
                  </td>
                );
              })}
            </TableRow>
          ))}
        </tbody>
      </Table>
      {items.length > maxRows ? (
        <TablePageControl>
          <span style={{ marginRight: '10px' }}>
            Page: {rowsPage} of {Math.ceil(items.length / maxRows)}
          </span>
          <IconButton
            onClick={prevPage}
            disabled={itemsIndex <= 0}
            relative
            show
          >
            <Icon height="13px">
              <FontAwesomeIcon icon={faChevronLeft} size="1x" />
            </Icon>
          </IconButton>
          <span style={{ margin: '0 10px' }}>
            {itemsIndex + 1} - {getRowsMaxIndex()} of {items.length}
          </span>
          <IconButton
            onClick={nextPage}
            disabled={getRowsMaxIndex() >= items.length}
            relative
            show
          >
            <Icon height="13px">
              <FontAwesomeIcon icon={faChevronRight} size="1x" />
            </Icon>
          </IconButton>
        </TablePageControl>
      ) : null}
    </>
  ) : null;
}
