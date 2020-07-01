import React, { useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import PlayerStatsDisplay from "../../PlayerStatsDisplay/PlayerStatsDisplay";

import { FlexContainer } from "../../../styledElements";

import {
  setIsPlayerStatsDialog,
  setGameSelectedPlayer,
} from "../../../actions";

const ItemContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: ${(props) =>
    props.roundLeft ? "15px 0 0 15px" : "0 15px 15px 0"};
  color: #333;
  text-transform: capitalize;
  margin-bottom: 15px;
  transition: box-shadow 0.1s ease;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  ${(props) =>
    props.selected &&
    css`
      box-shadow: 0 5px 8px 0px ${(props) => props.theme.success.color} inset;
    `}

  h2 {
    margin: 5px;
    font-size: 3rem;
    font-weight: bold;
  }
  h3 {
    margin: 0;
    color: #777;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 15px;
  }
  h4 {
    margin: 0;
    color: #999;
    font-weight: 300;
    margin-left: 10px;
  }
`;

const ShadowBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &:hover {
    box-shadow: ${(props) =>
      `0 2px 5px 1px ${props.theme.primary.hover} inset`};
  }
`;

function PlayerControlItem({ player, gameId, roundLeft }) {
  const dispatch = useDispatch();

  const isSetStatsDialogOpen = useSelector(
    (state) => state.game.isSetPlayerStatsDialog
  );

  const setSelectedPlayer = useCallback(
    (player) => dispatch(setGameSelectedPlayer(player)),
    [dispatch]
  );
  const openStatsDialog = useCallback(
    () => dispatch(setIsPlayerStatsDialog(true)),
    [dispatch]
  );

  useEffect(() => {
    if (!isSetStatsDialogOpen) {
      setSelectedPlayer(null);
    }
  }, [isSetStatsDialogOpen, setSelectedPlayer]);

  const openSetPlayerStatsDialog = (player) => () => {
    setSelectedPlayer(player);
    openStatsDialog();
  };

  return (
    player &&
    gameId && (
      <ItemContainer
        onClick={openSetPlayerStatsDialog(player)}
        roundLeft={roundLeft}
      >
        <FlexContainer justify="center" align="center" padding="0">
          <h2>{player.getNumber()}</h2>
          <h3>{player.getName()}</h3>
          <PlayerStatsDisplay stats={player.getStatsData(gameId)} />
        </FlexContainer>
        <ShadowBox />
      </ItemContainer>
    )
  );
}

PlayerControlItem.propTypes = {
  player: PropTypes.object,
  gameId: PropTypes.number,
  roundLeft: PropTypes.bool,
};

export default React.memo(PlayerControlItem);
