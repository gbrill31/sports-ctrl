import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexContainer, Button, Icon, Input } from "../../../styledElements";
import useFormInput from "../../../hooks/useFormInput";
import useSaveTeam from "../../../hooks/useSaveTeam";
import ItemActionsMenu from "../../ItemActionsMenu/ItemActionsMenu";

const ItemContainer = styled.div`
  width: 90%;
  border-radius: 0 15px 15px 0;
  background-color: #fff;
  color: #333;
  text-transform: capitalize;
  padding: 0 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.1s ease;
  overflow: hidden;
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
      box-shadow: 0 5px 8px 0px ${(props) => props.theme.secondary.color} inset;
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

const ItemEditActions = styled.div`
  height: auto;
  max-height: 0;
  transition: max-height 0.4s ease-in-out;
  overflow: hidden;

  ${(props) =>
    (props.active || props.selected) &&
    css`
      max-height: 100px;
    `}
`;

function TeamListItem({
  team,
  deleteTeamPrompt,
  selectedTeam,
  setSelectedTeam,
}) {
  const [isEditTeam, setIsEditTeam] = useState(false);

  const selectTeam = () => {
    if (!selectedTeam || selectedTeam.getId() !== team.getId())
      setSelectedTeam(team);
  };

  const teamName = useFormInput(team.getName());
  const teamLeague = useFormInput(team.getLeague());
  const teamCountry = useFormInput(team.getCountry());
  const teamCity = useFormInput(team.getCity());

  const isTeamSelected = useCallback(() => {
    return selectedTeam && selectedTeam.getId() === team.getId();
  }, [selectedTeam, team]);

  useEffect(() => {
    if (selectedTeam && !isTeamSelected()) {
      setIsEditTeam(false);
    }
  }, [selectedTeam, team, isTeamSelected]);

  const cancelEditTeam = () => {
    setIsEditTeam(false);
  };

  const deleteTeam = (e) => {
    if (e) e.stopPropagation();
    if (isEditTeam) cancelEditTeam();
    deleteTeamPrompt();
  };

  const saveTeam = useSaveTeam(cancelEditTeam);

  const editTeam = (e) => {
    e.stopPropagation();
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

  return (
    <>
      <ItemContainer selected={isTeamSelected()} onClick={selectTeam}>
        <ItemActionsMenu
          editItem={editTeam}
          deleteItem={deleteTeam}
          isShow={isTeamSelected() && !isEditTeam}
        />
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
        <ItemEditActions active={isEditTeam}>
          <FlexContainer justify={isEditTeam ? "flex-end" : false}>
            {isEditTeam && (
              <>
                <Button
                  aria-label="cencel edit team"
                  color="error"
                  onClick={cancelEditTeam}
                >
                  Cancel
                  <Icon spaceLeft>
                    <FontAwesomeIcon icon={faTimesCircle} size="sm" />
                  </Icon>
                </Button>
                <Button
                  aria-label="update team"
                  color="success"
                  onClick={updateTeam}
                >
                  Save
                  <Icon spaceLeft>
                    <FontAwesomeIcon icon={faSave} size="sm" />
                  </Icon>
                </Button>
              </>
            )}
          </FlexContainer>
        </ItemEditActions>
      </ItemContainer>
    </>
  );
}

TeamListItem.propTypes = {
  team: PropTypes.object.isRequired,
  deleteTeamPrompt: PropTypes.func.isRequired,
  selectedTeam: PropTypes.object,
  setSelectedTeam: PropTypes.func,
};

export default React.memo(TeamListItem);
