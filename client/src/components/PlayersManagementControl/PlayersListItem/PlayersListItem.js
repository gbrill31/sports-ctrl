import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  faTrashAlt,
  faEdit,
  faSave,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FlexContainer,
  Button,
  ButtonIcon,
  Input,
} from "../../../styledElements";
import useFormInput from "../../../hooks/useFormInput";
import useSavePlayers from "../../../hooks/useSavePlayers";
import PlayerStatsDisplay from "../../PlayerStatsDisplay/PlayerStatsDisplay";

const ItemContainer = styled.div`
  width: 90%;
  background-color: #fff;
  color: #333;
  text-transform: capitalize;
  padding: 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.1s ease;
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
      box-shadow: 0 5px 8px 0px ${(props) => props.theme.success.color} inset;
    `}

  h2 {
    font-size: 3rem;
    font-weight: bold;
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
    color: #999;
    font-weight: 300;
    margin-left: 10px;
  }
`;

const ItemStats = styled.div`
  height: auto;
  max-height: 0;
  transition: max-height 0.5s ease-in-out;
  overflow: hidden;

  ${(props) =>
    (props.active || props.selected) &&
    css`
      max-height: 500px;
    `}
`;

export default function PlayersListItem({
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

  const deleteItem = (e) => {
    e.stopPropagation();
    deletePlayerPrompt();
  };

  const cancelEditPlayer = (e) => {
    e.stopPropagation();
    setIsEditPlayer(false);
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
      <ItemStats active={isPlayerSelected()}>
        <FlexContainer justify={isEditPlayer ? "flex-end" : false}>
          {!isEditPlayer ? (
            <>
              <Button
                aria-label="edit player"
                color="primary"
                onClick={editPlayer}
                justifyRight
              >
                Edit
                <ButtonIcon spaceLeft>
                  <FontAwesomeIcon icon={faEdit} size="sm" />
                </ButtonIcon>
              </Button>
              <Button
                aria-label="delete player"
                color="error"
                onClick={deleteItem}
              >
                Delete
                <ButtonIcon spaceLeft>
                  <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                </ButtonIcon>
              </Button>
            </>
          ) : (
            <>
              <Button
                aria-label="cencel edit player"
                color="error"
                onClick={cancelEditPlayer}
              >
                Cancel
                <ButtonIcon spaceLeft>
                  <FontAwesomeIcon icon={faTimesCircle} size="sm" />
                </ButtonIcon>
              </Button>
              <Button
                aria-label="update team"
                color="success"
                onClick={savePlayer}
              >
                Save
                <ButtonIcon spaceLeft>
                  <FontAwesomeIcon icon={faSave} size="sm" />
                </ButtonIcon>
              </Button>
            </>
          )}
        </FlexContainer>
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
