import React from "react";
import { FlexContainer } from "../../../styledElements";
import { Input } from "../../../styledElements";
import useFormInput from "../../../hooks/useFormInput";
import useSaveVenue from "../../../hooks/useSaveVenue";
import ModalDialog from "../../ModalDialog/ModalDialog";

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

  return (
    <>
      <ModalDialog
        isOpen={isOpenDialog}
        title="Create a New Venue"
        label="new venue"
        handleConfirm={createNewVenue}
        handleCancel={cancelNewVenue}
      >
        <FlexContainer column justify="center" alig="center">
          <FlexContainer fullWidth justify="space-evenly" align="center">
            <label style={{ width: "10px" }}>Name</label>
            <Input
              required
              autoFocus
              onBlur={venueName.onChange}
              error={!venueName.isValid}
              ref={venueName.ref}
              id="name"
              type="text"
              placeholder={`Enter Venue Name${!venueName.isValid ? " *" : ""}`}
              value={venueName.value}
              onChange={venueName.onChange}
            />
          </FlexContainer>
          <FlexContainer fullWidth justify="space-evenly" align="center">
            <label style={{ width: "10px" }}>Country</label>
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
            />
          </FlexContainer>
          <FlexContainer fullWidth justify="space-evenly" align="center">
            <label style={{ width: "10px" }}>City</label>
            <Input
              required
              onBlur={venueCity.onChange}
              error={!venueCity.isValid}
              ref={venueCity.ref}
              id="city"
              type="text"
              placeholder={`Enter Venue City${!venueCity.isValid ? " *" : ""}`}
              value={venueCity.value}
              onChange={venueCity.onChange}
            />
          </FlexContainer>
          <FlexContainer fullWidth justify="space-evenly" align="center">
            <label style={{ width: "10px" }}>Seats</label>
            <Input
              id="seats"
              type="number"
              min="0"
              ref={venueSeats.ref}
              placeholder="Venue Seats"
              value={venueSeats.value}
              onChange={venueSeats.onChange}
              onFocus={venueSeats.select}
            />
          </FlexContainer>
        </FlexContainer>
      </ModalDialog>
    </>
  );
}
