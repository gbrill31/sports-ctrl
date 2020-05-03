import React, { useState, useEffect, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import useFormInput from '../../../hooks/useFormInput';
import { faTrashAlt, faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexContainer, Button, ButtonIcon, Input } from '../../../styledElements';

import {
  saveNewTeam,
} from '../../../actions';

const ItemContainer = styled.div`
  width: fit-content;
  background-color: #fff;
  color: #333;
  text-transform: capitalize;
  padding: 0 15px;
  margin-bottom: 15px;
  min-width: 500px;
  transition: box-shadow 0.1s ease;
  cursor: pointer;

  &:hover{
    box-shadow: ${props => !props.selected ? `0 2px 5px 1px ${props.theme.primary.hover} inset` : ''};
  }

  ${props => props.selected && css`
    box-shadow: 0 3px 1px 1px ${props => props.theme.success.color} inset;
  `}

  h2{
    font-size: 2rem;
    font-weight: bold;
  }
  h3{
    color: #777;
    text-transform: uppercase;
    font-weight: 300;
    margin-left: 15px;
  }
  h4{
    color: #999;
    font-weight: 300;
    margin-left: 10px;
  }
`;

const ItemActions = styled.div`
  height: 0;
  transition: height 0.1s ease-in;
  overflow: hidden;

  ${props => (props.active || props.selected) && css`
    height: 60px;
  `}
`;

export default function TeamListItem({
  team, deleteTeamPrompt, selectedTeam, setSelectedTeam
}) {
  const dispatch = useDispatch();
  const [isEditTeam, setIsEditTeam] = useState(false);
  // const [isEnter, setIsEnter] = useState(false);

  const toggleSelected = () => setSelectedTeam(team);

  const isSaving = useSelector(state => state.teams.teamSavePending);

  const teamName = useFormInput(team.getName());
  const teamLeague = useFormInput(team.getLeague());
  const teamCountry = useFormInput(team.getCountry());
  const teamCity = useFormInput(team.getCity());

  useEffect(() => {
    if (!isSaving) {
      setIsEditTeam(false);
    }
  }, [isSaving]);

  useEffect(() => {
    if (selectedTeam && selectedTeam.getId() !== team.getId()) {
      setIsEditTeam(false);
    }
  }, [selectedTeam, team]);

  // const onItemEnter = () => setIsEnter(true);
  // const onItemLeave = () => setIsEnter(false);

  const deleteItem = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    deleteTeamPrompt(team);
  }

  const saveTeam = (team) => dispatch(saveNewTeam(team));

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

  const cancelUpdateTeam = () => {
    setIsEditTeam(false);
  };

  return (
    <Fragment>
      <ItemContainer
        selected={selectedTeam && selectedTeam.getId() === team.getId()}
        onClick={toggleSelected}
      // onMouseEnter={onItemEnter}
      // onMouseLeave={onItemLeave}
      >
        <FlexContainer align="baseline" >
          <h2>
            {
              isEditTeam ? (
                <Input
                  autoFocus
                  required
                  disabled={isSaving}
                  ref={teamName.ref}
                  error={!teamName.isValid}
                  id="name"
                  type="text"
                  placeholder={`Enter Team Name${!teamName.isValid ? ' *' : ''}`}
                  value={teamName.value}
                  onChange={teamName.onChange}
                />
              ) : team.getName()
            }
          </h2>
          <h3>
            {
              isEditTeam ? (
                <Input
                  required
                  disabled={isSaving}
                  ref={teamLeague.ref}
                  error={!teamLeague.isValid}
                  id="league"
                  type="text"
                  placeholder={`Enter League Name${!teamLeague.isValid ? ' *' : ''}`}
                  value={teamLeague.value}
                  onChange={teamLeague.onChange}
                />
              ) : team.getLeague()
            }
          </h3>
          <h4>
            {
              isEditTeam ? (
                <Fragment>
                  <Input
                    required
                    spaceRight
                    disabled={isSaving}
                    ref={teamCity.ref}
                    error={!teamCity.isValid}
                    id="city"
                    type="text"
                    placeholder={`Enter Team City${!teamCity.isValid ? ' *' : ''}`}
                    value={teamCity.value}
                    onChange={teamCity.onChange}
                  />
                  <Input
                    required
                    disabled={isSaving}
                    ref={teamCountry.ref}
                    error={!teamCountry.isValid}
                    id="country"
                    type="text"
                    placeholder={`Enter Team Country${!teamCountry.isValid ? ' *' : ''}`}
                    value={teamCountry.value}
                    onChange={teamCountry.onChange}
                  />
                </Fragment>
              ) : `${team.getCity()}, ${team.getCountry()}`
            }
          </h4>

        </FlexContainer>
        <ItemActions
          active={selectedTeam && selectedTeam.getId() === team.getId()}
        >
          <FlexContainer justify={isEditTeam ? 'flex-end' : false}>
            {
              !isEditTeam ? (
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
                      disabled={isSaving}
                      onClick={cancelUpdateTeam}
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
                      disabled={isSaving}
                      saving={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                      <ButtonIcon spaceLeft>
                        <FontAwesomeIcon icon={faSave} size="sm" />
                      </ButtonIcon>
                    </Button>
                  </Fragment>
                )
            }
          </FlexContainer>
        </ItemActions>
      </ItemContainer>
    </Fragment >
  )
}
