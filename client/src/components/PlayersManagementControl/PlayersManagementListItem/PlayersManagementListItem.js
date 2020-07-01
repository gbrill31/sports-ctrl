import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexContainer, Button, Icon, Input } from "../../../styledElements";
import useFormInput from "../../../hooks/useFormInput";
import useSavePlayers from "../../../hooks/useSavePlayers";
import PlayerStatsDisplay from "../../PlayerStatsDisplay/PlayerStatsDisplay";
import ItemActionsMenu from "../../ItemActionsMenu/ItemActionsMenu";

const ItemContainer = styled.div`
  width: 90%;
  background-color: #fff;
  border-radius: 0 15px 15px 0;
  color: #333;
  text-transform: capitalize;
  padding: 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.1s ease;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: ${(props) =>
      !props.selected
        ? `0 2px 5px 1px ${props.theme.primary.hover} inset`
        : ""};
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
}) {
  const [isEditPlayer, setIsEditPlayer] = useState(false);

  const playerName = useFormInput("");
  const playerNumber = useFormInput("");

  const isPlayerSelected = () => {
    return selectedPlayer && selectedPlayer.getId() === player.getId();
  };

  const selectPlayer = () => {
    if (!isPlayerSelected()) {
      setSelectedPlayer(player);
    } else {
      setIsEditPlayer(false);
      setSelectedPlayer(null);
    }
  };

  const cancelEditPlayer = (e) => {
    e.stopPropagation();
    setIsEditPlayer(false);
  };

  const deletePlayer = (e) => {
    e.stopPropagation();
    if (isEditPlayer) cancelEditPlayer();
    deletePlayerPrompt();
  };

  const savePlayersToTeam = useSavePlayers(() => setIsEditPlayer(false));

  const savePlayer = (e) => {
    e.stopPropagation();
    savePlayersToTeam({
      id: player.getId(),
      name: playerName.value,
      number: playerNumber.value,
      team: player.getTeamName(),
      teamId: player.getTeamId(),
    });
  };

  const editPlayer = (e) => {
    e.stopPropagation();
    playerName.setValue(player.getName());
    playerNumber.setValue(player.getNumber());
    setIsEditPlayer(true);
  };

  return (
    <ItemContainer selected={isPlayerSelected()} onClick={selectPlayer}>
      <ItemActionsMenu
        editItem={editPlayer}
        deleteItem={deletePlayer}
        isShow={isPlayerSelected() && !isEditPlayer}
      />
      <FlexContainer align="baseline" padding="0">
        {isEditPlayer ? (
          <FlexContainer>
            <FlexContainer fullWidth justify="space-evenly" align="center">
              <label style={{ width: "10px" }}>Name:</label>
              <Input
                autoFocus
                required
                ref={playerName.ref}
                error={!playerName.isValid}
                id="name"
                type="text"
                placeholder={`Enter Player Name${
                  !playerName.isValid ? " *" : ""
                }`}
                value={playerName.value}
                onChange={playerName.onChange}
                onClick={playerName.onFocus}
                spaceLeft
              />
            </FlexContainer>
            <FlexContainer fullWidth justify="space-evenly" align="center">
              <label style={{ width: "10px" }}>Number:</label>
              <Input
                required
                ref={playerNumber.ref}
                error={!playerNumber.isValid}
                id="number"
                type="text"
                placeholder={`Enter Player Number${
                  !playerNumber.isValid ? " *" : ""
                }`}
                value={playerNumber.value}
                onChange={playerNumber.onChange}
                onClick={playerNumber.onFocus}
                spaceLeft
              />
            </FlexContainer>
          </FlexContainer>
        ) : (
          <>
            <h2>{player.getNumber()}</h2>
            <h3>{player.getName()}</h3>
          </>
        )}
      </FlexContainer>
      <FlexContainer justify={isEditPlayer ? "flex-end" : false}>
        {isEditPlayer && (
          <>
            <Button
              aria-label="cencel edit player"
              color="error"
              onClick={cancelEditPlayer}
            >
              Cancel
              <Icon spaceLeft>
                <FontAwesomeIcon icon={faTimesCircle} size="sm" />
              </Icon>
            </Button>
            <Button
              aria-label="update team"
              color="success"
              onClick={savePlayer}
            >
              Save
              <Icon spaceLeft>
                <FontAwesomeIcon icon={faSave} size="sm" />
              </Icon>
            </Button>
          </>
        )}
      </FlexContainer>
      <ItemStats active={isPlayerSelected() && !isEditPlayer}>
        {player.stats && (
          <>
            <h4>Last Game</h4>
            <h3>{player.getPlayedAgainst()}</h3>
            <h4>Game Statistics</h4>
            <PlayerStatsDisplay stats={player.getStatsData()} />
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
};

export default React.memo(PlayersManagementListItem);
