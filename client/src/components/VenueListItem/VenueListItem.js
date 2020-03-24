import React, { useState, useEffect, Fragment } from 'react';
import {
  Card, CardContent, CardActions, Typography, IconButton, TextField,
  CircularProgress
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import useFormInput from '../../hooks/useFormInput';
import { faTrashAlt, faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  saveNewVenue,
} from '../../actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 275,
    margin: 15,
    position: 'relative'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  venue: {
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

export default function VenueListItem({
  venue, deleteVenuePrompt
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isEditVenue, setIsEditVenue] = useState(false);

  const isSaving = useSelector(state => state.venues.venueSavePending);

  const venueName = useFormInput(venue.name);
  const venueCountry = useFormInput(venue.country);
  const venueCity = useFormInput(venue.city);
  const [venueSeats, setVenueSeats] = useState(venue.seats);

  useEffect(() => {
    if (!isSaving) {
      setIsEditVenue(false);
    }
  }, [isSaving]);

  const saveVenue = (venue) => dispatch(saveNewVenue(venue));

  const editVenue = () => {
    setIsEditVenue(true);
  };

  const updateVenue = () => {
    saveVenue({
      id: venue.id,
      name: venueName.value,
      country: venueCountry.value,
      city: venueCity.value,
      seats: venueSeats
    });
  };

  const cancelUpdateVenue = () => {
    setIsEditVenue(false);
  };

  const onVenueSeatsChange = (e) => setVenueSeats(e.target.value);


  return (
    <Card className={classes.root} key={venue.id}>
      <CardContent>
        <Typography className={classes.venue} variant="h5" component="h2">
          {
            isEditVenue ? (
              <TextField
                autoFocus
                required
                disabled={isSaving}
                inputProps={{
                  ref: venueName.ref
                }}
                error={!venueName.isValid}
                helperText={venueName.errorMessage}
                margin="dense"
                id="name"
                label="Name"
                type="text"
                placeholder="Venue Name"
                value={venueName.value}
                onChange={venueName.onChange}
              />
            ) :
              venue.name
          }
        </Typography>
        <Typography className={classes.title} component="h4" color="textSecondary">
          {
            isEditVenue ? (
              <TextField
                margin="dense"
                required
                disabled={isSaving}
                inputProps={{
                  ref: venueCity.ref
                }}
                error={!venueCity.isValid}
                helperText={venueCity.errorMessage}
                id="city"
                label="City"
                type="text"
                placeholder="Venue City"
                value={venueCity.value}
                onChange={venueCity.onChange}
              />
            ) : venue.city
          }
        </Typography>
        <Typography className={classes.pos} component="h3" color="textSecondary" gutterBottom>
          {
            isEditVenue ? (
              <TextField
                margin="dense"
                required
                disabled={isSaving}
                inputProps={{
                  ref: venueCountry.ref
                }}
                error={!venueCountry.isValid}
                helperText={venueCountry.errorMessage}
                id="country"
                label="Country"
                type="text"
                placeholder="Venue Country"
                value={venueCountry.value}
                onChange={venueCountry.onChange}
              />
            ) :
              venue.country
          }
        </Typography>
        {
          isEditVenue ? (
            <TextField
              margin="dense"
              disabled={isSaving}
              id="seats"
              label="Seats"
              type="number"
              inputProps={{
                min: 0
              }}
              placeholder="Venue Seats"
              value={venueSeats}
              onChange={onVenueSeatsChange}
            />
          ) : (
              <Typography variant="body2" component="p" style={{ maxWidth: 'fit-content' }}>
                <span className={classes.venue}>{venue.name}</span>{` arena can host up to ${venue.seats} fans`}
              </Typography>
            )
        }

      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        {
          !isEditVenue && <IconButton
            aria-label="delete venue"
            color="secondary"
            onClick={deleteVenuePrompt(venue)}
          >
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
          </IconButton>
        }
        {
          isEditVenue ? (
            <Fragment>
              <IconButton
                aria-label="update venue"
                color="secondary"
                disabled={isSaving}
                onClick={cancelUpdateVenue}
              >
                <FontAwesomeIcon icon={faTimesCircle} size="sm" />
              </IconButton>
              <div className={classes.actionRight}>
                {
                  isSaving ? (
                    <CircularProgress size={24} />
                  ) : (
                      <IconButton
                        aria-label="update venue"
                        color="primary"
                        onClick={updateVenue}
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
                aria-label="edit venue"
                color="primary"
                onClick={editVenue}
              >
                <FontAwesomeIcon icon={faEdit} size="sm" />
              </IconButton>
            )
        }

      </CardActions>
    </Card >
  )
}
