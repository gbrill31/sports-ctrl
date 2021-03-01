import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@material-ui/core';

import PromptDialog from '../../PromptDialog/PromptDialog';
import FilterListInput from '../../FilterListInput/FilterListInput';
import VenueListItem from '../VenueListItem/VenueListItem';
import ComponentLoader from '../../ComponentLoader/ComponentLoader';
import NewVenueForm from '../../VenuesManagementControl/NewVenueForm/NewVenueForm';
import {
  FlexContainer,
  ScrollableContainer,
  Button,
  Icon,
} from '../../../styledElements';

import useVenues from '../../../hooks/reactQuery/useVenues';
import useDeleteVenue from '../../../hooks/reactQuery/useDeleteVenue';
import ModalDialog from '../../ModalDialog/ModalDialog';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { isFullControl } from '../../../services/userPermissions';

function VenuesList() {
  const queryClient = useQueryClient();
  const [isDeleteVenuePrompt, setIsDeleteVenuePrompt] = useState(false);
  const [isNewVenueDialog, setIsNewVenueDialog] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const { user } = useSelector((state) => state.auth);

  const [selectedVenue, setSelectedVenue] = useState(null);

  const openNewVenueDialog = () => setIsNewVenueDialog(true);
  const closeNewVenueDialog = () => {
    setSelectedVenue(null);
    setIsNewVenueDialog(false);
  };

  const closeDeleteVenuePrompt = () => setIsDeleteVenuePrompt(false);

  const deleteSelectedVenue = useDeleteVenue(closeDeleteVenuePrompt);

  const cancelNewVenue = () => {
    closeNewVenueDialog();
  };

  const deleteVenue = () => {
    deleteSelectedVenue(selectedVenue.id);
  };

  const { isLoading, data: venues, isFetching } = useVenues(
    queryClient.getQueryData('dbConnection') !== undefined
  );

  const openDeleteVenuePrompt = () => {
    setIsDeleteVenuePrompt(true);
  };

  const getFilteredVenues = () => {
    const value = filterValue.toLowerCase();
    return value !== ''
      ? venues.filter(
          (venue) =>
            venue.name.toLowerCase().includes(value) ||
            venue.country.toLowerCase().includes(value) ||
            venue.city.toLowerCase().includes(value)
        )
      : venues;
  };

  return (
    <>
      <ComponentLoader loading={isLoading}>
        {isFullControl(user) ? (
          <FlexContainer fullWidth align="center">
            <FlexContainer>
              <Button color="success" onClick={openNewVenueDialog}>
                New Venue
                <Icon spaceLeft>
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </Icon>
              </Button>
            </FlexContainer>
            {isFetching && (
              <CircularProgress size={25} style={{ color: '#fff' }} />
            )}
          </FlexContainer>
        ) : null}
        <FlexContainer fullWidth padding="0">
          {venues?.length > 0 && (
            <FilterListInput
              onChange={setFilterValue}
              placeholder="Venue Name, Country, City"
              width="65%"
            />
          )}
        </FlexContainer>
        <ScrollableContainer padding="0" heightDiff={267}>
          <FlexContainer>
            {venues &&
              getFilteredVenues()
                .sort((venueA, venueB) =>
                  venueA.name.toLowerCase() > venueB.name.toLowerCase() ? 1 : -1
                )
                .map((venue) => (
                  <VenueListItem
                    key={venue.id}
                    venue={venue}
                    deleteVenuePrompt={openDeleteVenuePrompt}
                    isDeleteVenue={isDeleteVenuePrompt}
                    selectedVenue={selectedVenue}
                    setSelectedVenue={setSelectedVenue}
                    openNewVenueDialog={openNewVenueDialog}
                    user={user}
                  />
                ))}
          </FlexContainer>
        </ScrollableContainer>
      </ComponentLoader>

      <PromptDialog
        isOpen={isDeleteVenuePrompt}
        title="Delete Venue"
        content={`Are you sure you want to delete ${selectedVenue?.name}`}
        confirmText="Delete"
        handleClose={closeDeleteVenuePrompt}
        handleConfirm={deleteVenue}
      />
      <ModalDialog
        component={NewVenueForm}
        componentProps={{ cb: cancelNewVenue, venue: selectedVenue }}
        isOpen={isNewVenueDialog}
        title="Create a New Venue"
        label="new venue"
        handleCancel={cancelNewVenue}
      />
    </>
  );
}

export default VenuesList;
