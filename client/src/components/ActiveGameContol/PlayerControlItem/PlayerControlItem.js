import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

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
  padding: 15px;
  margin-bottom: 15px;
  /* min-width: 600px; */
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

const ItemStat = styled.div`
  color: ${props => props.color ? props.theme[props.color].color : props.theme.success.color};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 20px;

  h3{
    margin: 0;
    color: #777;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
    margin-left: 15px;
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
      <FlexContainer align="center" padding="0">
        <h2>
          {player.getNumber()}
        </h2>
        <h3>
          {player.getName()}
        </h3>
        <ItemStat>
          Points: {player.getTotalPoints(gameId)}
        </ItemStat>
        <ItemStat color={player.getTotalFouls(gameId) > 3 ? 'error' : 'primary'}>
          FOULS: {player.getTotalFouls(gameId)}
        </ItemStat>
      </FlexContainer>
      <h4>Game Statistics</h4>
      <FlexContainer>
        <ItemStat>
          <h3>2FG: {player.get2FG(gameId)}</h3>
        </ItemStat>
        <ItemStat>
          <h3>3FG: {player.get3FG(gameId)}</h3>
        </ItemStat>
        <ItemStat>
          <h3>FT: {player.getFT(gameId)}</h3>
        </ItemStat>
      </FlexContainer>
    </ItemContainer>
  )
}
