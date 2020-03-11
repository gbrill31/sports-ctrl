import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, CardContent, CardActions, Typography, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PromptDialog from '../PromptDialog/PromptDialog';

import { getAllVenues, deleteVenue } from '../../actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 15
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const DeletePrompt = ({ selectedVenue, isDeleteVenue, setIsDeleteVenue, isDeleting }) => {
  const dispatch = useDispatch();
  const deleteSelectedVenue = useCallback(() => dispatch(deleteVenue(selectedVenue.id)), [dispatch, selectedVenue.id]);

  const handleCancel = () => setIsDeleteVenue(false);

  return (
    <PromptDialog
      isOpen={isDeleteVenue}
      title="Delete Vanue"
      content={`Are you sure you want to delete ${selectedVenue.name}`}
      confirmText="Delete"
      handleClose={handleCancel}
      handleConfirm={deleteSelectedVenue}
      isPending={isDeleting}
    />
  )
}


export default function VenuesList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isDeleteVenue, setIsDeleteVenue] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const venues = useSelector(state => state.venues.items);
  const isDeleting = useSelector(state => state.venues.venueDeletePending);

  const getVenues = useCallback(() => dispatch(getAllVenues()), [dispatch]);

  const deleteVenuePrompt = venue => () => {
    setSelectedVenue(venue);
    setIsDeleteVenue(true);
  }

  useEffect(() => {
    getVenues();
  }, [getVenues]);


  useEffect(() => {
    if (!isDeleting) {
      setIsDeleteVenue(false);
    }
  }, [isDeleting]);

  return (
    <Fragment>
      {
        venues && venues.map(venue => (
          <Card className={classes.root} key={venue.id}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {venue.name}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                {venue.city}
              </Typography>
              <Typography className={classes.pos} color="textSecondary" gutterBottom>
                {venue.country}
              </Typography>
              <Typography variant="body2" component="p">
                {`${venue.name} arena can host up to ${venue.seats} fans`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={deleteVenuePrompt(venue)}
              >
                Delete
                </Button>
            </CardActions>
          </Card>
        ))
      }
      {
        isDeleteVenue && (
          <DeletePrompt
            selectedVenue={selectedVenue}
            isDeleteVenue={isDeleteVenue}
            setIsDeleteVenue={setIsDeleteVenue}
            isDeleting={isDeleting}
          />
        )
      }
    </Fragment>
  )
};