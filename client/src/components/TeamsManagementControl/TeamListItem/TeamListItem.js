import React, { useState, useEffect, Fragment } from "react";
import styled, { css } from "styled-components";
import useFormInput from "../../../hooks/useFormInput";
import useSaveTeam from "../../../hooks/useSaveTeam";
import {
  faTrashAlt,
  faEdit,
  faSave,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FlexContainer,
  Button,
  ButtonIcon,
  Input,
} from "../../../styledElements";

const ItemContainer = styled.div`
  width: 90%;
  border-radius: 15px;
  background-color: #fff;
  color: #333;
  text-transform: capitalize;
  padding: 0 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.1s ease;
  cursor: pointer;

  &:hover {
    box-shadow: ${(props) =>
      !props.selected
        ? `0 2px 5px 1px ${props.theme.primary.hover} inset`
        : ""};
  }

  ${(props) =>
    props.selected &&
    css`
      box-shadow: 0 5px 8px 0px ${(props) => props.theme.success.color} inset;
    `}

  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
  h3 {
    color: #777;
    text-transform: uppercase;
    font-weight: 300;
    margin-left: 15px;
  }
  h4 {
    color: #999;
    font-weight: 300;
    margin-left: 10px;
  }
`;

const ItemActions = styled.div`
  height: auto;
  max-height: 0;
  transition: max-height 0.2s ease-in-out;
  overflow: hidden;

  ${(props) =>
    (props.active || props.selected) &&
    css`
      max-height: 100px;
    `}
`;

export default function TeamListItem({
  team,
  deleteTeamPrompt,
  selectedTeam,
  setSelectedTeam,
}) {
  const [isEditTeam, setIsEditTeam] = useState(false);

  const selectTeam = () => {
    if (selectedTeam.getId() !== team.getId()) setSelectedTeam(team);
  };

  const teamName = useFormInput(team.getName());
  const teamLeague = useFormInput(team.getLeague());
  const teamCountry = useFormInput(team.getCountry());
  const teamCity = useFormInput(team.getCity());

  useEffect(() => {
    if (selectedTeam && selectedTeam.getId() !== team.getId()) {
      setIsEditTeam(false);
    }
  }, [selectedTeam, team]);

  const deleteItem = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    deleteTeamPrompt(team);
  };
  const cancelEditTeam = () => {
    setIsEditTeam(false);
  };

  const saveTeam = useSaveTeam(cancelEditTeam);

  const editTeam = () => {
    teamName.setValue(team.getName());
    teamLeague.setValue(team.getLeague());
    setIsEditTeam(true);
  };

  const updateTeam = () => {
    saveTeam({
      id: team.getId(),
      name: teamName.value,
      league: teamLeague.value,
      country: teamCountry.value,
      city: teamCity.value,
    });
  };

  const isTeamSelected = () => {
    return selectedTeam && selectedTeam.getId() === team.getId();
  };

  return (
    <Fragment>
      <ItemContainer selected={isTeamSelected()} onClick={selectTeam}>
        <FlexContainer align="baseline">
          {isEditTeam ? (
            <FlexContainer>
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: "10px" }}>Name:</label>
                <Input
                  autoFocus
                  required
                  ref={teamName.ref}
                  error={!teamName.isValid}
                  id="name"
                  type="text"
                  placeholder={`Enter Team Name${
                    !teamName.isValid ? " *" : ""
                  }`}
                  value={teamName.value}
                  onChange={teamName.onChange}
                  spaceLeft
                />
              </FlexContainer>
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: "10px" }}>League:</label>
                <Input
                  required
                  ref={teamLeague.ref}
                  error={!teamLeague.isValid}
                  id="league"
                  type="text"
                  placeholder={`Enter League Name${
                    !teamLeague.isValid ? " *" : ""
                  }`}
                  value={teamLeague.value}
                  onChange={teamLeague.onChange}
                  spaceLeft
                />
              </FlexContainer>
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: "10px" }}>City:</label>
                <Input
                  required
                  spaceLeft
                  ref={teamCity.ref}
                  error={!teamCity.isValid}
                  id="city"
                  type="text"
                  placeholder={`Enter Team City${
                    !teamCity.isValid ? " *" : ""
                  }`}
                  value={teamCity.value}
                  onChange={teamCity.onChange}
                />
              </FlexContainer>
              <FlexContainer fullWidth justify="space-evenly" align="center">
                <label style={{ width: "10px" }}>Country:</label>
                <Input
                  required
                  ref={teamCountry.ref}
                  error={!teamCountry.isValid}
                  id="country"
                  type="text"
                  placeholder={`Enter Team Country${
                    !teamCountry.isValid ? " *" : ""
                  }`}
                  value={teamCountry.value}
                  onChange={teamCountry.onChange}
                />
              </FlexContainer>
            </FlexContainer>
          ) : (
            <>
              <h2>{team.getName()}</h2>
              <h3>{team.getLeague()}</h3>
              <h4>{`${team.getCity()}, ${team.getCountry()}`}</h4>
            </>
          )}
        </FlexContainer>
        <ItemActions active={isTeamSelected()}>
          <FlexContainer justify={isEditTeam ? "flex-end" : false}>
            {!isEditTeam ? (
              <Fragment>
                <Button
                  aria-label="edit team"
                  color="primary"
                  onClick={editTeam}
                  justifyRight
                >
                  Edit
                  <ButtonIcon spaceLeft>
                    <FontAwesomeIcon icon={faEdit} size="sm" />
                  </ButtonIcon>
                </Button>
                <Button
                  aria-label="delete team"
                  color="error"
                  onClick={deleteItem}
                >
                  Delete
                  <ButtonIcon spaceLeft>
                    <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                  </ButtonIcon>
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  aria-label="cencel edit team"
                  color="error"
                  onClick={cancelEditTeam}
                >
                  Cancel
                  <ButtonIcon spaceLeft>
                    <FontAwesomeIcon icon={faTimesCircle} size="sm" />
                  </ButtonIcon>
                </Button>
                <Button
                  aria-label="update team"
                  color="success"
                  onClick={updateTeam}
                >
                  Save
                  <ButtonIcon spaceLeft>
                    <FontAwesomeIcon icon={faSave} size="sm" />
                  </ButtonIcon>
                </Button>
              </Fragment>
            )}
          </FlexContainer>
        </ItemActions>
      </ItemContainer>
    </Fragment>
  );
}
