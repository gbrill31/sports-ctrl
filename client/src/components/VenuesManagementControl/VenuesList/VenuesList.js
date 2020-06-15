import React, { useState } from "react";
import { useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@material-ui/core";

import PromptDialog from "../../PromptDialog/PromptDialog";
import VenueListItem from "../VenueListItem/VenueListItem";
import ComponentLoader from "../../ComponentLoader/ComponentLoader";
import NewVenueFormDialog from "../../VenuesManagementControl/NewVenueFormDIalog/NewVenueFormDialog";
import {
  FlexContainer,
  ScrollableContainer,
  Button,
  MainTitle,
  ButtonIcon,
} from "../../../styledElements";

import useVenues from "../../../hooks/useVenues";
import useDeleteVenue from "../../../hooks/useDeleteVenue";

export default function VenuesList() {
  const [isDeleteVenuePrompt, setIsDeleteVenuePrompt] = useState(false);
  const [isNewVenueDialog, setIsNewVenueDialog] = useState(false);

  const [selectedVenue, setSelectedVenue] = useState(null);

  const isDBConnected = useSelector((state) => state.db.isConnected);

  const openNewVenueDialog = () => setIsNewVenueDialog(true);
  const closeNewVenueDialog = () => setIsNewVenueDialog(false);

  const closeDeleteVenuePrompt = () => setIsDeleteVenuePrompt(false);

  const deleteSelectedVenue = useDeleteVenue(closeDeleteVenuePrompt);

  const deleteVenue = () => {
    deleteSelectedVenue(selectedVenue.id);
  };

  const { status, data: venues, isFetching } = useVenues(isDBConnected);

  const openDeleteVenuePrompt = (venue) => () => {
    setSelectedVenue(venue);
    setIsDeleteVenuePrompt(true);
  };

  return (
    <>
      <ComponentLoader loading={status === "loading"}>
        <FlexContainer fullWidth align="center">
          <MainTitle>Venues</MainTitle>
          <FlexContainer>
            <Button color="generic" onClick={openNewVenueDialog}>
              New Venue
              <ButtonIcon spaceLeft>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </ButtonIcon>
            </Button>
          </FlexContainer>
          {isFetching && <CircularProgress size={25} color="inherit" />}
        </FlexContainer>
        <ScrollableContainer padding="0" heightDiff={267}>
          <FlexContainer>
            {venues &&
              venues
                .sort((venueA, venueB) =>
                  venueA.name.toLowerCase() > venueB.name.toLowerCase() ? 1 : -1
                )
                .map((venue) => (
                  <VenueListItem
                    key={venue.id}
                    venue={venue}
                    deleteVenuePrompt={openDeleteVenuePrompt}
                  />
                ))}
          </FlexContainer>
        </ScrollableContainer>
      </ComponentLoader>
      {isDeleteVenuePrompt && (
        <PromptDialog
          isOpen={isDeleteVenuePrompt}
          title="Delete Vanue"
          content={`Are you sure you want to delete ${selectedVenue.name}`}
          confirmText="Delete"
          handleClose={closeDeleteVenuePrompt}
          handleConfirm={deleteVenue}
        />
      )}
      <NewVenueFormDialog
        closeDialog={closeNewVenueDialog}
        isOpenDialog={isNewVenueDialog}
      />
    </>
  );
}
