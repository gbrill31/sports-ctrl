import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PromptDialog from '../../PromptDialog/PromptDialog';
import VenueListItem from '../VenueListItem/VenueListItem';

import { getAllVenues, deleteVenue } from '../../../actions';



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

  const dispatch = useDispatch();
  const [isDeleteVenue, setIsDeleteVenue] = useState(false);

  const [selectedVenue, setSelectedVenue] = useState(null);

  const isDBConnected = useSelector(state => state.db.isConnected);
  const venues = useSelector(state => state.venues.items);
  const isDeleting = useSelector(state => state.venues.venueDeletePending);

  const getVenues = useCallback(() => dispatch(getAllVenues()), [dispatch]);

  const deleteVenuePrompt = venue => () => {
    setSelectedVenue(venue);
    setIsDeleteVenue(true);
  };


  useEffect(() => {
    if (isDBConnected) {
      getVenues();
    }
  }, [getVenues, isDBConnected]);


  useEffect(() => {
    if (!isDeleting) {
      setIsDeleteVenue(false);
    }
  }, [isDeleting]);

  return (
    <Fragment>
      {
        venues && venues
          .sort((venueA, venueB) => venueA.name.toLowerCase() > venueB.name.toLowerCase() ? 1 : -1)
          .map(venue => (
            <VenueListItem
              key={venue.id}
              venue={venue}
              deleteVenuePrompt={deleteVenuePrompt}
            />
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