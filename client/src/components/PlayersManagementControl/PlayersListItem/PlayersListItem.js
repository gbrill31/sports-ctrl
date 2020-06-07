import React, { Fragment, useState } from 'react';
import styled, { css } from 'styled-components';
import { faTrashAlt, faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexContainer, Button, ButtonIcon, Input } from '../../../styledElements';
import useFormInput from '../../../hooks/useFormInput';
import {
  TableContainer, Table, TableBody, TableCell, TableHead,
  TableRow, Paper
} from '@material-ui/core';
import {
  savePlayersToTeam,
} from '../../../api';


const ItemContainer = styled.div`
  width: 90%;
  background-color: #fff;
  color: #333;
  text-transform: capitalize;
  padding: 15px;
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
    font-size: 3rem;
    font-weight: bold;
  }
  h3{
    margin: 0;
    color: #777;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 300;
    margin-left: 15px;
  }
  h4{
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

  ${props => (props.active || props.selected) && css`
    max-height: 500px;
  `}
`;

const statsHeaders = [
  {
    id: 1,
    title: 'PT'
  }
  ,
  {
    id: 2,
    title: '2FG'
  },
  {
    id: 3,
    title: '3FG'
  },
  {
    id: 4,
    title: 'FT'
  },
  {
    id: 5,
    title: 'FOULS'
  }
];

export default function PlayersListItem({
  player, selectedPlayer, setSelectedPlayer, deletePlayerPrompt, updatePlayers
}) {
  const [isEditPlayer, setIsEditPlayer] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const selectPlayer = () => setSelectedPlayer(player);

  const playerName = useFormInput('');
  const playerNumber = useFormInput('');

  const isPlayerSelected = () => {
    return selectedPlayer && selectedPlayer.getId() === player.getId();
  }

  const deleteItem = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    deletePlayerPrompt(player);
  }

  const cancelUpdatePlayer = () => {
    setIsEditPlayer(false);
  };

  const savePlayer = () => {
    setIsSaving(true);
    savePlayersToTeam({
      id: player.getId(),
      name: playerName.value,
      number: playerNumber.value,
      team: player.getTeamName(),
      teamId: player.getTeamId()
    })
      .then((player) => {
        updatePlayers(player);
        setIsSaving(false);
        // resetForm();
        setIsEditPlayer(false);
      });
  };

  const editPlayer = () => {
    playerName.setValue(player.getName());
    playerNumber.setValue(player.getNumber());
    setIsEditPlayer(true);
  };

  return (
    <ItemContainer
      selected={isPlayerSelected()}
      onClick={selectPlayer}
    >
      <FlexContainer align="baseline" padding="0">
        {
          isEditPlayer ? (
            <FlexContainer>
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: '10px' }}>Name:</label>
                <Input
                  autoFocus
                  required
                  disabled={isSaving}
                  ref={playerName.ref}
                  error={!playerName.isValid}
                  id="name"
                  type="text"
                  placeholder={`Enter Player Name${!playerName.isValid ? ' *' : ''}`}
                  value={playerName.value}
                  onChange={playerName.onChange}
                  spaceLeft
                />
              </FlexContainer>
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: '10px' }}>Number:</label>
                <Input
                  required
                  disabled={isSaving}
                  ref={playerNumber.ref}
                  error={!playerNumber.isValid}
                  id="number"
                  type="text"
                  placeholder={`Enter Player Number${!playerNumber.isValid ? ' *' : ''}`}
                  value={playerNumber.value}
                  onChange={playerNumber.onChange}
                  spaceLeft
                />
              </FlexContainer>
            </FlexContainer>
          ) : (
              <>
                <h2>
                  {player.getNumber()}
                </h2>
                <h3>
                  {player.getName()}
                </h3>
              </>
            )
        }
      </FlexContainer>
      <ItemStats active={isPlayerSelected()}>
        <FlexContainer justify={isEditPlayer ? 'flex-end' : false}>
          {
            !isEditPlayer ? (
              <Fragment>
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
              </Fragment>
            ) : (
                <Fragment>
                  <Button
                    aria-label="cencel edit player"
                    color="error"
                    disabled={isSaving}
                    onClick={cancelUpdatePlayer}
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
                    disabled={isSaving}
                    saving={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                    <ButtonIcon spaceLeft>
                      <FontAwesomeIcon icon={faSave} size="sm" />
                    </ButtonIcon>
                  </Button>
                </Fragment>
              )
          }
        </FlexContainer>
        <h4>Last Game</h4>
        <h3>{player.getPlayedAgainst()}</h3>
        <h4>Game Statistics</h4>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="player stats table">
            <TableHead>
              <TableRow>
                {
                  statsHeaders.map(statHeader => <TableCell key={statHeader.id}>{statHeader.title}</TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">{player.getTotalPoints()}</TableCell>
                <TableCell align="left">{player.get2FG()}</TableCell>
                <TableCell align="left">{player.get3FG()}</TableCell>
                <TableCell align="left">{player.getFT()}</TableCell>
                <TableCell align="left">{player.getTotalFouls()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ItemStats>
    </ItemContainer>
  )
}