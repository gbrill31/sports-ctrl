import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { FlexContainer } from '../../../styledElements';
import ItemActionsMenu from '../../ItemActionsMenu/ItemActionsMenu';
import { isFullControl } from '../../../services/userPermissions';

const ItemContainer = styled.div`
  width: 25%;
  min-width: 350px;
  min-height: 120px;
  background-color: #fff;
  border-radius: 0 15px 15px 0;
  color: #333;
  text-transform: capitalize;
  padding: 0 15px;
  margin: 0 0 15px 15px;
  transition: box-shadow 0.1s ease;
  overflow: hidden;
  cursor: pointer;
  position: relative;

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
    font-size: 3rem;
    font-weight: bold;
    margin: 0;
  }
  h3 {
    margin: 0;
    color: #777;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 300;
  }
  h4 {
    margin: 8px 0 8px 10px;
    color: #999;
    font-weight: 300;
  }
`;

const LeagueInfoSection = styled.div`
  position: absolute;
  bottom: ${(props) => (props.selected ? '3px' : '-50px')};
  left: 7px;
  transition: bottom 0.2s ease-in-out;
`;

function LeagueListItem({
  league,
  deleteLeaguePrompt,
  selectedLeague,
  setSelectedLeague,
  openNewLeagueDialog,
  user,
}) {
  const [isItemHover, setIsItemHover] = useState(false);

  const setItemMouseEnter = () => setIsItemHover(true);
  const setItemMouseLeave = () => setIsItemHover(false);

  const selectLeague = () => {
    setSelectedLeague(league);
  };

  const isLeagueSelected = () => selectedLeague?.id === league.id;

  const editLeague = () => {
    setSelectedLeague(league);
    openNewLeagueDialog();
  };

  const deleteLeague = () => {
    deleteLeaguePrompt();
  };

  return (
    <ItemContainer
      onClick={selectLeague}
      selected={isLeagueSelected()}
      onMouseEnter={setItemMouseEnter}
      onMouseLeave={setItemMouseLeave}
    >
      <ItemActionsMenu
        editItem={editLeague}
        deleteItem={deleteLeague}
        isShow={isFullControl(user) && isLeagueSelected()}
      />
      <h2>{league.name}</h2>
      <FlexContainer align="baseline" padding="0">
        <h3>{league.city}</h3>
        <h4>{league.country}</h4>
      </FlexContainer>
      <LeagueInfoSection selected={isItemHover || isLeagueSelected()}>
        {/* <FlexContainer align="center" justify="center" padding="0">
              <h4>{` host up to ${league.seats} fans`}</h4>
            </FlexContainer> */}
      </LeagueInfoSection>
    </ItemContainer>
  );
}

LeagueListItem.propTypes = {
  league: PropTypes.object.isRequired,
  deleteLeaguePrompt: PropTypes.func,
  selectedLeague: PropTypes.object,
  setSelectedLeague: PropTypes.func,
  openNewLeagueDialog: PropTypes.func,
};

export default React.memo(LeagueListItem);
