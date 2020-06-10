import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import PlayerStatsDisplay from '../../PlayerStatsDisplay/PlayerStatsDisplay';

import {
  FlexContainer
} from '../../../styledElements';

import {
  setIsPlayerStatsDialog,
  setGameSelectedPlayer
} from '../../../actions';

const ItemContainer = styled.div`
  width: 100%;
  background-color: #fff;
  color: #333;
  text-transform: capitalize;
  margin-bottom: 15px;
  transition: box-shadow 0.1s ease;
  cursor: pointer;

  &:hover{
    box-shadow: ${props => !props.selected ? `0 2px 5px 1px ${props.theme.primary.hover} inset` : ''};
  }

  ${props => props.selected && css`
    box-shadow: 0 5px 8px 0px ${props => props.theme.success.color} inset;
  `}

  h2{
    font-size: 2rem;
    font-weight: bold;
  }
  h3{
    margin: 0;
    color: #777;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 15px;
  }
  h4{
    margin: 0;
    color: #999;
    font-weight: 300;
    margin-left: 10px;
  }
`;

export default function PlayerControlItem({ player, gameId }) {
  const dispatch = useDispatch();

  const isSetStatsDialogOpen = useSelector(state => state.game.isSetPlayerStatsDialog);

  const setSelectedPlayer = useCallback((player) => dispatch(setGameSelectedPlayer(player)), [dispatch]);
  const openStatsDialog = useCallback(() => dispatch(setIsPlayerStatsDialog(true)), [dispatch]);

  useEffect(() => {
    if (!isSetStatsDialogOpen) {
      setSelectedPlayer(null);
    }
  }, [isSetStatsDialogOpen, setSelectedPlayer]);

  const openSetPlayerStats = player => () => {
    setSelectedPlayer(player);
    openStatsDialog();
  }

  return (
    <ItemContainer onClick={openSetPlayerStats(player)}>

      <FlexContainer justify="center" align="center" padding="0">
        <h2>
          {player.getNumber()}
        </h2>
        <h3>
          {player.getName()}
        </h3>
        <PlayerStatsDisplay stats={player.getStatsData(gameId)} />
      </FlexContainer>
    </ItemContainer>
  )
}
