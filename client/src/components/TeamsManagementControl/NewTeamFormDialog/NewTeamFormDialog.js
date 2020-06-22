import React from "react";
import { Input, FlexContainer } from "../../../styledElements";
import useFormInput from "../../../hooks/useFormInput";
import useSaveTeam from "../../../hooks/useSaveTeam";
import ModalDialog from "../../ModalDialog/ModalDialog";

export default function NewTeamFormDialog({ isOpenDialog, closeDialog }) {
  const teamName = useFormInput("");
  const teamLeague = useFormInput("");
  const teamCountry = useFormInput("");
  const teamCity = useFormInput("");

  const resetForm = () => {
    teamName.setValue("");
    teamLeague.setValue("");
    teamCountry.setValue("");
    teamCity.setValue("");
    teamName.resetIsValid();
    teamLeague.resetIsValid();
    teamCountry.resetIsValid();
    teamCity.resetIsValid();
  };

  const cancelNewTeam = () => {
    resetForm();
    closeDialog();
  };

  const createTeam = useSaveTeam(cancelNewTeam);

  const validateAllInputs = () => {
    teamName.validateInput();
    teamLeague.validateInput();
    teamCountry.validateInput();
    teamCity.validateInput();
  };

  const isSaveValid = () => {
    return (
      teamName.ref.current.checkValidity() &&
      teamLeague.ref.current.checkValidity() &&
      teamCountry.ref.current.checkValidity() &&
      teamCity.ref.current.checkValidity()
    );
  };

  const createNewTeam = () => {
    validateAllInputs();
    if (isSaveValid()) {
      createTeam({
        name: teamName.value,
        league: teamLeague.value,
        country: teamCountry.value,
        city: teamCity.value,
      });
    }
  };

  return (
    <>
      <ModalDialog
        isOpen={isOpenDialog}
        title="Create a New Team"
        label="new team"
        handleConfirm={createNewTeam}
        handleCancel={cancelNewTeam}
      >
        <FlexContainer column justify="center" align="center">
          <FlexContainer fullWidth justify="space-evenly" align="center">
            <label style={{ width: "10px" }}>Name</label>
            <Input
              required
              autoFocus
              onBlur={teamName.onChange}
              error={!teamName.isValid}
              ref={teamName.ref}
              id="name"
              type="text"
              placeholder={`Enter Team Name${!teamName.isValid ? " *" : ""}`}
              value={teamName.value}
              onChange={teamName.onChange}
            />
          </FlexContainer>
          <FlexContainer fullWidth justify="space-evenly" align="center">
            <label style={{ width: "10px" }}>League Name</label>
            <Input
              required
              onBlur={teamLeague.onChange}
              error={!teamLeague.isValid}
              ref={teamLeague.ref}
              id="league"
              type="text"
              placeholder={`Enter Team League${
                !teamLeague.isValid ? " *" : ""
              }`}
              value={teamLeague.value}
              onChange={teamLeague.onChange}
            />
          </FlexContainer>
          <FlexContainer fullWidth justify="space-evenly" align="center">
            <label style={{ width: "10px" }}>Country</label>
            <Input
              required
              onBlur={teamCountry.onChange}
              error={!teamCountry.isValid}
              ref={teamCountry.ref}
              id="country"
              type="text"
              placeholder={`Enter Team Country${
                !teamCountry.isValid ? " *" : ""
              }`}
              value={teamCountry.value}
              onChange={teamCountry.onChange}
            />
          </FlexContainer>
          <FlexContainer fullWidth justify="space-evenly" align="center">
            <label style={{ width: "10px" }}>City</label>
            <Input
              required
              onBlur={teamCity.onChange}
              error={!teamCity.isValid}
              ref={teamCity.ref}
              id="city"
              type="text"
              placeholder={`Enter Team City${!teamCity.isValid ? " *" : ""}`}
              value={teamCity.value}
              onChange={teamCity.onChange}
            />
          </FlexContainer>
        </FlexContainer>
      </ModalDialog>
    </>
  );
}
