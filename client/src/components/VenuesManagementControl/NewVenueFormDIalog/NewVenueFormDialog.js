import React from "react";
import { FlexContainer } from "../../../styledElements";

import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@material-ui/core";
import { Button, Input } from "../../../styledElements";
import useFormInput from "../../../hooks/useFormInput";
import useSaveVenue from "../../../hooks/useSaveVenue";

export default function NewVenueFormDialog({ isOpenDialog, closeDialog }) {
  const venueName = useFormInput("");
  const venueCountry = useFormInput("");
  const venueCity = useFormInput("");
  const venueSeats = useFormInput(0);

  const saveNewVenue = useSaveVenue(closeDialog);

  const resetForm = () => {
    venueName.setValue("");
    venueCountry.setValue("");
    venueCity.setValue("");
    venueSeats.setValue(0);
    venueName.resetIsValid();
    venueCountry.resetIsValid();
    venueCity.resetIsValid();
  };

  const cancelNewVenue = () => {
    resetForm();
    closeDialog();
  };

  const validateAllInputs = () => {
    venueName.validateInput();
    venueCountry.validateInput();
    venueCity.validateInput();
  };

  const isSaveValid = () => {
    return (
      venueName.ref.current.checkValidity() &&
      venueCountry.ref.current.checkValidity() &&
      venueCity.ref.current.checkValidity()
    );
  };

  const createNewVenue = () => {
    validateAllInputs();
    if (isSaveValid()) {
      saveNewVenue({
        name: venueName.value,
        country: venueCountry.value,
        city: venueCity.value,
        seats: Number(venueSeats.value),
      });
      resetForm();
    }
  };

  const handleKeyDown = (e) => {
    const { keyCode, key } = e;
    if (keyCode === 13 || key === "Enter") {
      createNewVenue();
    }
  };

  return (
    <>
      {isOpenDialog && (
        <Dialog
          open={isOpenDialog}
          aria-labelledby="new venue"
          onEscapeKeyDown={cancelNewVenue}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Create a New Venue</DialogTitle>
          <DialogContent>
            <FlexContainer column justify="center" alig="center">
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: "10px" }} htmlFor="name">
                  Name
                </label>
                <Input
                  required
                  autoFocus
                  onBlur={venueName.onChange}
                  error={!venueName.isValid}
                  ref={venueName.ref}
                  id="name"
                  type="text"
                  placeholder={`Enter Venue Name${
                    !venueName.isValid ? " *" : ""
                  }`}
                  value={venueName.value}
                  onChange={venueName.onChange}
                  onKeyDown={handleKeyDown}
                />
              </FlexContainer>
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: "10px" }} htmlFor="country">
                  Country
                </label>
                <Input
                  required
                  onBlur={venueCountry.onChange}
                  error={!venueCountry.isValid}
                  ref={venueCountry.ref}
                  id="country"
                  type="text"
                  placeholder={`Enter Venue Country${
                    !venueCountry.isValid ? " *" : ""
                  }`}
                  value={venueCountry.value}
                  onChange={venueCountry.onChange}
                  onKeyDown={handleKeyDown}
                />
              </FlexContainer>
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: "10px" }} htmlFor="city">
                  City
                </label>
                <Input
                  required
                  onBlur={venueCity.onChange}
                  error={!venueCity.isValid}
                  ref={venueCity.ref}
                  id="city"
                  type="text"
                  placeholder={`Enter Venue City${
                    !venueCity.isValid ? " *" : ""
                  }`}
                  value={venueCity.value}
                  onChange={venueCity.onChange}
                  onKeyDown={handleKeyDown}
                />
              </FlexContainer>
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: "10px" }} htmlFor="seats">
                  Seats
                </label>
                <Input
                  id="seats"
                  type="number"
                  min="0"
                  ref={venueSeats.ref}
                  placeholder="Venue Seats"
                  value={venueSeats.value}
                  onChange={venueSeats.onChange}
                  onFocus={venueSeats.select}
                  onKeyDown={handleKeyDown}
                />
              </FlexContainer>
            </FlexContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="error">
              Cancel
            </Button>
            <Button onClick={createNewVenue} color="success">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
