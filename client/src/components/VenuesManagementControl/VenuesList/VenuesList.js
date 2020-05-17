import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PromptDialog from '../../PromptDialog/PromptDialog';
import VenueListItem from '../VenueListItem/VenueListItem';
import ComponentLoader from '../../ComponentLoader/ComponentLoader';
import NewVenueFormDialog from '../../VenuesManagementControl/NewVenueFormDIalog/NewVenueFormDialog';
import { FlexContainer, ScrollableContainer, Button, MainTitle, ButtonIcon } from '../../../styledElements';

import { getAllVenues, deleteVenue, openNewVenueDialog } from '../../../actions';



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
      pendingTitle="Deleting..."
    />
  )
}


export default function VenuesList() {

  const dispatch = useDispatch();
  const [isDeleteVenue, setIsDeleteVenue] = useState(false);

  const [selectedVenue, setSelectedVenue] = useState(null);

  const isDBConnected = useSelector(state => state.db.isConnected);
  const venues = useSelector(state => state.venues.items);
  const isVenuesLoading = useSelector(state => state.venues.getVenuesPending);
  const isDeleting = useSelector(state => state.venues.venueDeletePending);

  const getVenues = useCallback(() => dispatch(getAllVenues()), [dispatch]);
  const openNewVenue = useCallback(() => dispatch(openNewVenueDialog()), [dispatch]);

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
      <ComponentLoader loading={isVenuesLoading}>
        <FlexContainer fullWidth align="center">
          <MainTitle>Venues</MainTitle>
          <FlexContainer>
            <Button
              color="generic"
              onClick={openNewVenue}
            >
              New Venue
        <ButtonIcon spaceLeft>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </ButtonIcon>
            </Button>
          </FlexContainer>
        </FlexContainer>
        <ScrollableContainer padding="0" heightDiff={267}>
          <FlexContainer>
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
          </FlexContainer>
        </ScrollableContainer>
      </ComponentLoader>
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
      <NewVenueFormDialog />
    </Fragment>
  )
};