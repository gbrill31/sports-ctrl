import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FlexContainer } from '../../../styledElements';
import ItemActionsMenu from '../../ItemActionsMenu/ItemActionsMenu';

import { isFullControl } from '../../../services/userPermissions';

const ItemContainer = styled.div`
  width: 90%;
  border-radius: 0 15px 15px 0;
  background-color: #fff;
  color: #333;
  text-transform: capitalize;
  padding: 0 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.1s ease;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: ${(props) =>
      !props.selected
        ? `0 2px 5px 1px ${props.theme.primary.hover} inset`
        : ''};
  }

  ${(props) =>
    props.selected &&
    css`
      box-shadow: 0 5px 8px 0px ${(props) => props.theme.secondary.color} inset;
    `}

  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
  h3 {
    color: #777;
    text-transform: uppercase;
    font-weight: 300;
    margin-left: 15px;
  }
  h4 {
    color: #999;
    font-weight: 300;
    margin-left: 10px;
  }
`;

function TeamManagementListItem({
  team,
  deleteTeamPrompt,
  selectedTeam,
  setSelectedTeam,
  openCreateTeamDialog,
  user,
}) {
  const selectTeam = () => {
    if (!selectedTeam || selectedTeam.id !== team.id) setSelectedTeam(team);
  };

  const isTeamSelected = useCallback(() => {
    return selectedTeam && selectedTeam.id === team.id;
  }, [selectedTeam, team]);

  const deleteTeam = (e) => {
    if (e) e.stopPropagation();
    deleteTeamPrompt();
  };

  const editTeam = (e) => {
    e.stopPropagation();
    setSelectedTeam(team);
    openCreateTeamDialog();
  };

  return (
    <>
      <ItemContainer selected={isTeamSelected()} onClick={selectTeam}>
        <ItemActionsMenu
          editItem={editTeam}
          deleteItem={deleteTeam}
          isShow={isFullControl(user) && isTeamSelected()}
        />
        <FlexContainer align="baseline">
          <h2>{team.name}</h2>
          <h3>{team.league}</h3>
          <h4>{`${team.city}, ${team.country}`}</h4>
        </FlexContainer>
      </ItemContainer>
    </>
  );
}

TeamManagementListItem.propTypes = {
  team: PropTypes.object.isRequired,
  deleteTeamPrompt: PropTypes.func.isRequired,
  selectedTeam: PropTypes.object,
  setSelectedTeam: PropTypes.func,
  openCreateTeamDialog: PropTypes.func,
};

export default React.memo(TeamManagementListItem);
