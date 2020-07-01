import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@material-ui/core";

import PromptDialog from "../../PromptDialog/PromptDialog";
import FilterListInput from "../../FilterListInput/FilterListInput";
import VenueListItem from "../VenueListItem/VenueListItem";
import ComponentLoader from "../../ComponentLoader/ComponentLoader";
import NewVenueFormDialog from "../../VenuesManagementControl/NewVenueFormDIalog/NewVenueFormDialog";
import {
  FlexContainer,
  ScrollableContainer,
  Button,
  MainTitle,
  Icon,
} from "../../../styledElements";

import useVenues from "../../../hooks/useVenues";
import useDeleteVenue from "../../../hooks/useDeleteVenue";
import useDb from "../../../hooks/useDb";

function VenuesList() {
  const [isDeleteVenuePrompt, setIsDeleteVenuePrompt] = useState(false);
  const [isNewVenueDialog, setIsNewVenueDialog] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const [selectedVenue, setSelectedVenue] = useState(null);

  const { status: dbStatus } = useDb();

  const openNewVenueDialog = () => setIsNewVenueDialog(true);
  const closeNewVenueDialog = () => setIsNewVenueDialog(false);

  const closeDeleteVenuePrompt = () => setIsDeleteVenuePrompt(false);

  const deleteSelectedVenue = useDeleteVenue(closeDeleteVenuePrompt);

  const deleteVenue = () => {
    deleteSelectedVenue(selectedVenue.id);
  };

  const { status, data: venues, isFetching } = useVenues(
    dbStatus === "success"
  );

  const openDeleteVenuePrompt = () => {
    setIsDeleteVenuePrompt(true);
  };

  const getFilteredVenues = () => {
    const value = filterValue.toLowerCase();
    return value !== ""
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
      <ComponentLoader loading={status === "loading"}>
        <FlexContainer fullWidth align="center">
          <MainTitle>Venues</MainTitle>
          <FlexContainer>
            <Button color="generic" onClick={openNewVenueDialog}>
              New Venue
              <Icon spaceLeft>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </Icon>
            </Button>
          </FlexContainer>
          {isFetching && (
            <CircularProgress size={25} style={{ color: "#fff" }} />
          )}
        </FlexContainer>
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
                  />
                ))}
          </FlexContainer>
        </ScrollableContainer>
      </ComponentLoader>

      <PromptDialog
        isOpen={isDeleteVenuePrompt}
        title="Delete Vanue"
        content={`Are you sure you want to delete ${selectedVenue?.name}`}
        confirmText="Delete"
        handleClose={closeDeleteVenuePrompt}
        handleConfirm={deleteVenue}
      />
      <NewVenueFormDialog
        closeDialog={closeNewVenueDialog}
        isOpenDialog={isNewVenueDialog}
      />
    </>
  );
}

export default VenuesList;
