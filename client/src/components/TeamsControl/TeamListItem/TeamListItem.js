import React, { useState, useEffect, Fragment } from 'react';
import {
  Card, CardContent, CardActions, Typography, IconButton, TextField,
  CircularProgress
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import useFormInput from '../../../hooks/useFormInput';
import { faTrashAlt, faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  saveNewTeam,
} from '../../../actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 300,
    margin: 15,
    position: 'relative'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  team: {
    textTransform: 'capitalize'
  },
  title: {
    fontSize: 14,
    textTransform: 'capitalize'
  },
  pos: {
    marginBottom: 12,
    textTransform: 'capitalize'
  },
  actions: {
    position: 'absolute',
    width: '95%',
    bottom: '5px',
    left: 0
  },
  actionRight: {
    marginLeft: 'auto'
  }
});

export default function TeamListItem({
  team, deleteTeamPrompt
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isEditTeam, setIsEditTeam] = useState(false);

  const isSaving = useSelector(state => state.teams.teamSavePending);

  const teamName = useFormInput(team.name);
  const teamCountry = useFormInput(team.country);
  const teamCity = useFormInput(team.city);

  useEffect(() => {
    if (!isSaving) {
      setIsEditTeam(false);
    }
  }, [isSaving]);

  const saveTeam = (team) => dispatch(saveNewTeam(team));

  const editTeam = () => {
    setIsEditTeam(true);
  };

  const updateTeam = () => {
    saveTeam({
      id: team.id,
      name: teamName.value,
      country: teamCountry.value,
      city: teamCity.value,
    });
  };

  const cancelUpdateTeam = () => {
    setIsEditTeam(false);
  };

  return (
    <Card className={classes.root} key={team.id}>
      <CardContent>
        <Typography className={classes.team} variant="h5" component="h2">
          {
            isEditTeam ? (
              <TextField
                autoFocus
                required
                disabled={isSaving}
                inputProps={{
                  ref: teamName.ref
                }}
                error={!teamName.isValid}
                helperText={teamName.errorMessage}
                margin="dense"
                id="name"
                label="Name"
                type="text"
                placeholder="Team Name"
                value={teamName.value}
                onChange={teamName.onChange}
              />
            ) :
              team.name
          }
        </Typography>
        <Typography className={classes.title} component="h4" color="textSecondary">
          {
            isEditTeam ? (
              <TextField
                margin="dense"
                required
                disabled={isSaving}
                inputProps={{
                  ref: teamCity.ref
                }}
                error={!teamCity.isValid}
                helperText={teamCity.errorMessage}
                id="city"
                label="City"
                type="text"
                placeholder="Team City"
                value={teamCity.value}
                onChange={teamCity.onChange}
              />
            ) : team.city
          }
        </Typography>
        <Typography className={classes.pos} component="h3" color="textSecondary" gutterBottom>
          {
            isEditTeam ? (
              <TextField
                margin="dense"
                required
                disabled={isSaving}
                inputProps={{
                  ref: teamCountry.ref
                }}
                error={!teamCountry.isValid}
                helperText={teamCountry.errorMessage}
                id="country"
                label="Country"
                type="text"
                placeholder="Team Country"
                value={teamCountry.value}
                onChange={teamCountry.onChange}
              />
            ) : team.country
          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        {
          !isEditTeam && <IconButton
            aria-label="delete team"
            color="secondary"
            onClick={deleteTeamPrompt(team)}
          >
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
          </IconButton>
        }
        {
          isEditTeam ? (
            <Fragment>
              <IconButton
                aria-label="update team"
                color="secondary"
                disabled={isSaving}
                onClick={cancelUpdateTeam}
              >
                <FontAwesomeIcon icon={faTimesCircle} size="sm" />
              </IconButton>
              <div className={classes.actionRight}>
                {
                  isSaving ? (
                    <CircularProgress size={24} />
                  ) : (
                      <IconButton
                        aria-label="update team"
                        color="primary"
                        onClick={updateTeam}
                      >
                        <FontAwesomeIcon icon={faSave} size="sm" />
                      </IconButton>
                    )

                }
              </div>
            </Fragment>
          ) : (
              <IconButton
                className={classes.actionRight}
                aria-label="edit team"
                color="primary"
                onClick={editTeam}
              >
                <FontAwesomeIcon icon={faEdit} size="sm" />
              </IconButton>
            )
        }

      </CardActions>
    </Card >
  )
}
