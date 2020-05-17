import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DialogActions, DialogTitle, DialogContent, Dialog
} from '@material-ui/core';
import { Button, ButtonIcon, Input, FlexContainer } from '../../../styledElements';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFormInput from '../../../hooks/useFormInput';

import {
  savePlayers,
  closeNewPlayersDialog
} from '../../../actions';


export default function NewPlayerFormDialog() {
  const dispatch = useDispatch();

  const [players, setPlayers] = useState([]);
  const playerName = useFormInput('');
  const playerNumber = useFormInput('');

  const selectedTeam = useSelector(state => state.teams.selected);
  const {
    playerSavePending: isSaving,
    newPlayersDialog: isNewPlayersDialog
  } = useSelector(state => state.players);

  const saveNewPlayers = useCallback((players) => dispatch(savePlayers(players)), [dispatch]);
  const closeDialog = useCallback(() => dispatch(closeNewPlayersDialog()), [dispatch]);

  useEffect(() => {
    if (!isNewPlayersDialog && players.length) {
      setPlayers([]);
    }
  }, [players, isNewPlayersDialog]);

  const resetForm = () => {
    playerName.setValue('');
    playerNumber.setValue('');
    playerName.resetIsValid();
    playerNumber.resetIsValid();
  }

  const cancelNewPlayer = () => {
    resetForm();
    closeDialog();
  }


  const validateAllInputs = () => {
    playerName.validateInput();
    playerNumber.validateInput();
  }

  const isSaveValid = () => {
    return playerName.ref.current.checkValidity()
      && playerNumber.ref.current.checkValidity();
  }

  const savePlayersToTeam = () => {
    saveNewPlayers(players);
  };


  const addPlayer = () => {
    validateAllInputs();
    if (isSaveValid()) {
      setPlayers([...players, {
        name: playerName.value,
        number: playerNumber.value,
        team: selectedTeam.name,
        teamId: selectedTeam.id
      }]);
      resetForm();
      setTimeout(() => {
        playerName.ref.current.focus();
      }, 50);
    }
  };

  const handleKeyDown = (e) => {
    const { keyCode, key } = e;
    if (keyCode === 13 || key === 'Enter') {
      addPlayer();
    }
  }

  const removePlayer = player => () => {
    setPlayers(players.filter(p => (p.name !== player.name && p.number !== player.number)));
  }


  return (
    <Fragment>
      {
        isNewPlayersDialog && (
          <Dialog
            open={isNewPlayersDialog}
            aria-labelledby="add players"
            onEscapeKeyDown={cancelNewPlayer}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Add players to team</DialogTitle>
            <DialogContent>
              <FlexContainer column justify="center" alig="center">
                <FlexContainer fullWidth justify="space-evenly" align="center">
                  <label style={{ width: '10px' }}>Name</label>
                  <Input
                    required
                    autoFocus
                    onBlur={playerName.onChange}
                    error={!playerName.isValid}
                    ref={playerName.ref}
                    id="name"
                    type="text"
                    placeholder={`Enter Player Name${!playerName.isValid ? ' *' : ''}`}
                    value={playerName.value}
                    onChange={playerName.onChange}
                    onKeyDown={handleKeyDown}
                  />
                </FlexContainer>
                <FlexContainer fullWidth justify="space-evenly" align="center">
                  <label style={{ width: '10px' }}>Number</label>
                  <Input
                    required
                    onBlur={playerNumber.onChange}
                    error={!playerNumber.isValid}
                    ref={playerNumber.ref}
                    id="league"
                    type="text"
                    placeholder={`Enter Player Number${!playerNumber.isValid ? ' *' : ''}`}
                    value={playerNumber.value}
                    onChange={playerNumber.onChange}
                    onKeyDown={handleKeyDown}
                  />
                </FlexContainer>
              </FlexContainer>
              <FlexContainer justify="center">
                <Button onClick={addPlayer} color="primary">
                  Add
                  <ButtonIcon spaceLeft>
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                  </ButtonIcon>
                </Button>
              </FlexContainer>
              <FlexContainer>
                {
                  players && players.map(player => (
                    <Button
                      color="generic"
                      key={`${player.name}${player.number}`}
                      onClick={removePlayer(player)}
                    >
                      {`${player.number} ${player.name}`}
                      <ButtonIcon spaceLeft>
                        <FontAwesomeIcon icon={faTimes} size="sm" />
                      </ButtonIcon>
                    </Button>
                  ))
                }
              </FlexContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelNewPlayer} color="error">
                Cancel
              </Button>
              <Button
                onClick={savePlayersToTeam}
                color="success"
                disabled={players.length === 0 || isSaving}
                saving={isSaving}
              >
                {isSaving ? 'Saving...' : 'Add Players'}
              </Button>

            </DialogActions>
          </Dialog>
        )
      }
    </Fragment>
  )
}
