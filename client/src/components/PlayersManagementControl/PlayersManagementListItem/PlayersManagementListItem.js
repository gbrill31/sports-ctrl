import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FlexContainer } from '../../../styledElements';
import PlayerStatsDisplay from '../../PlayerStatsDisplay/PlayerStatsDisplay';
import ItemActionsMenu from '../../ItemActionsMenu/ItemActionsMenu';
import moment from 'moment';

import { isFullControl } from '../../../services/userPermissions';
import useLeague from '../../../hooks/reactQuery/useLeague';

const ItemContainer = styled.div`
  width: 90%;
  background-color: #fff;
  border-radius: 0 15px 15px 0;
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
    margin-left: 15px;
  }
  h4 {
    margin: 8px 0 8px 10px;
    color: #999;
    font-weight: 300;
  }
`;

const ItemStats = styled.div`
  height: auto;
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;

  ${(props) =>
    (props.active || props.selected) &&
    css`
      max-height: 500px;
    `}
`;

function PlayersManagementListItem({
  player,
  selectedPlayer,
  setSelectedPlayer,
  deletePlayerPrompt,
  openAddPlayersDialog,
  user,
}) {
  const [lastGameStats, setLastGameStats] = useState(null);

  const { data: league } = useLeague(lastGameStats?.leagueId);

  const isPlayerSelected = () => {
    return selectedPlayer && selectedPlayer.id === player.id;
  };

  const selectPlayer = () => {
    if (!isPlayerSelected()) {
      setSelectedPlayer(player);
    } else {
      setSelectedPlayer(null);
    }
  };

  const deletePlayer = (e) => {
    e.stopPropagation();
    deletePlayerPrompt();
  };

  const editPlayer = (e) => {
    e.stopPropagation();
    setSelectedPlayer(player);
    openAddPlayersDialog();
  };

  useEffect(() => {
    if (player && player.stats?.length) {
      if (player.stats.length > 1) {
        const stats = [...player.stats];
        const recentGameStats = stats.sort((statA, statB) =>
          moment(statB.gameDate).isBefore(statA.gameDate) ? -1 : 1
        );
        setLastGameStats(recentGameStats[0]);
      } else {
        setLastGameStats(player.stats[0]);
      }
    } else {
      setLastGameStats([]);
    }
  }, [player]);

  return (
    <ItemContainer selected={isPlayerSelected()} onClick={selectPlayer}>
      <ItemActionsMenu
        editItem={editPlayer}
        deleteItem={deletePlayer}
        isShow={isFullControl(user) && isPlayerSelected()}
      />
      <FlexContainer align="baseline" padding="0">
        <h2>{player.number}</h2>
        <h3>{player.name}</h3>
      </FlexContainer>
      <ItemStats active={isPlayerSelected()}>
        {player.stats && lastGameStats && (
          <>
            <h4>Last Game {league?.name || ''}</h4>
            <h3>{lastGameStats?.playedAgainst}</h3>
            <h4>Game Statistics</h4>
            <PlayerStatsDisplay
              stats={lastGameStats.data}
              maxTechFouls={league?.maxTechFoulsCount}
              maxFouls={league?.maxPlayerFoulsCount}
            />
          </>
        )}
      </ItemStats>
    </ItemContainer>
  );
}

PlayersManagementListItem.propTypes = {
  player: PropTypes.object.isRequired,
  selectedPlayer: PropTypes.object,
  setSelectedPlayer: PropTypes.func,
  deletePlayerPrompt: PropTypes.func,
  openAddPlayersDialog: PropTypes.func,
};

export default React.memo(PlayersManagementListItem);
