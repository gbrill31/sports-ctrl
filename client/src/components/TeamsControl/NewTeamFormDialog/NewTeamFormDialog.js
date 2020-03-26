import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DialogActions, DialogTitle, DialogContent, Dialog,
  CircularProgress
} from '@material-ui/core';
import { Button, Input, FlexContainer } from '../../../styledElements';
import useFormInput from '../../../hooks/useFormInput';

import {
  saveNewTeam,
} from '../../../actions';


export default function NewTeamFormDialog({ isNewTeam, setIsNewTeam }) {
  const dispatch = useDispatch();

  const teamName = useFormInput('');
  const teamCountry = useFormInput('');
  const teamCity = useFormInput('');

  const isSaving = useSelector(state => state.teams.teamSavePending);


  const resetForm = () => {
    teamName.setValue('');
    teamCountry.setValue('');
    teamCity.setValue('');
    teamName.resetIsValid();
    teamCountry.resetIsValid();
    teamCity.resetIsValid();
    setIsNewTeam(false);
  }

  const cancelNewTeam = () => {
    setIsNewTeam(false);
    resetForm();
  }

  const createTeam = (team) => dispatch(saveNewTeam(team));

  const validateAllInputs = () => {
    teamName.validateInput();
    teamCountry.validateInput();
    teamCity.validateInput();

  }

  const isSaveValid = () => {
    return teamName.ref.current.checkValidity()
      && teamCountry.ref.current.checkValidity()
      && teamCity.ref.current.checkValidity();
  }

  const createNewTeam = () => {
    validateAllInputs();
    if (isSaveValid()) {
      createTeam({
        name: teamName.value,
        country: teamCountry.value,
        city: teamCity.value,
      });
      resetForm();
    }
  };



  return (
    <Fragment>

      {
        isNewTeam && (
          <Dialog
            open={isNewTeam}
            aria-labelledby="new team"
            onEscapeKeyDown={cancelNewTeam}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Create a New Team</DialogTitle>
            <DialogContent>
              <FlexContainer column justify="center" alig="center">
                <FlexContainer fullWidth justify="space-evenly" align="center">
                  <label style={{ width: '10px' }}>Name</label>
                  <Input
                    required
                    autoFocus
                    onBlur={teamName.onChange}
                    error={!teamName.isValid}
                    ref={teamName.ref}
                    id="name"
                    type="text"
                    placeholder={`Enter Team Name${!teamName.isValid ? ' *' : ''}`}
                    value={teamName.value}
                    onChange={teamName.onChange}
                  />
                </FlexContainer>
                <FlexContainer fullWidth justify="space-evenly" align="center">
                  <label style={{ width: '10px' }}>Country</label>
                  <Input
                    required
                    onBlur={teamCountry.onChange}
                    error={!teamCountry.isValid}
                    ref={teamCountry.ref}
                    id="country"
                    type="text"
                    placeholder={`Enter Team Country${!teamCountry.isValid ? ' *' : ''}`}
                    value={teamCountry.value}
                    onChange={teamCountry.onChange}
                  />
                </FlexContainer>
                <FlexContainer fullWidth justify="space-evenly" align="center">
                  <label style={{ width: '10px' }}>City</label>
                  <Input
                    required
                    onBlur={teamCity.onChange}
                    error={!teamCity.isValid}
                    ref={teamCity.ref}
                    id="city"
                    type="text"
                    placeholder={`Enter Team City${!teamCity.isValid ? ' *' : ''}`}
                    value={teamCity.value}
                    onChange={teamCity.onChange}
                  />
                </FlexContainer>
              </FlexContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelNewTeam} color="error">
                Cancel
      </Button>
              <Button onClick={createNewTeam} color="success">
                Create
              </Button>
              {isSaving && <CircularProgress size={24} />}
            </DialogActions>
          </Dialog>
        )
      }
    </Fragment>
  )
}
