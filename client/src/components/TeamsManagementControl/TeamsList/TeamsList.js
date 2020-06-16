import React, { useState, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@material-ui/core";
import {
  FlexContainer,
  Button,
  ButtonIcon,
  ScrollableContainer,
  MainTitle,
} from "../../../styledElements";

import PromptDialog from "../../PromptDialog/PromptDialog";
import NewTeamFormDialog from "../../../components/TeamsManagementControl/NewTeamFormDialog/NewTeamFormDialog";
import TeamListItem from "../TeamListItem/TeamListItem";
import ComponentLoader from "../../../components/ComponentLoader/ComponentLoader";
import FilterListInput from "../../FilterListInput/FilterListInput";
import useTeams from "../../../hooks/useTeams";
import useDeleteTeam from "../../../hooks/useDeleteTeam";

import { setSelectedTeam, openNewTeamDialog } from "../../../actions";

export default function TeamsList() {
  const dispatch = useDispatch();

  const isDBConnected = useSelector((state) => state.db.isConnected);
  const { status, data: teams, isFetching } = useTeams(isDBConnected);

  const { selected: selectedTeam } = useSelector((state) => state.teams);

  const [filterValue, setFilterValue] = useState("");
  const [isDeleteTeamPrompt, setIsDeleteTeamPrompt] = useState(false);

  const setSelected = useCallback(
    (team) => {
      dispatch(setSelectedTeam(team));
    },
    [dispatch]
  );
  const openCreateTeamDialog = useCallback(
    () => dispatch(openNewTeamDialog()),
    [dispatch]
  );

  const closeDeletePrompt = () => setIsDeleteTeamPrompt(false);

  const deleteTeam = useDeleteTeam(closeDeletePrompt);

  const deleteSelectedTeam = () => deleteTeam(selectedTeam.getId());

  const getFilteredTeams = () => {
    const value = filterValue.toLowerCase();
    return value !== ""
      ? teams.filter(
          (team) =>
            team.getName().includes(value) ||
            team.getLeague().includes(value) ||
            team.getCountry().includes(value)
        )
      : teams;
  };

  const deleteTeamPrompt = () => {
    setIsDeleteTeamPrompt(true);
  };

  // Select first team
  // useEffect(() => {
  //   if (teams?.length && !selectedTeam) {
  //     setSelected(teams[0]);
  //   }
  // }, [teams, selectedTeam, setSelected]);

  return (
    <Fragment>
      <FlexContainer
        borderRight
        minWidth={status === "loading" ? "50vw" : false}
      >
        <ComponentLoader loading={status === "loading"} size={100}>
          <FlexContainer fullWidth align="center">
            <MainTitle margin="0">Teams</MainTitle>
            <Button color="generic" onClick={openCreateTeamDialog}>
              New Team
              <ButtonIcon spaceLeft>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </ButtonIcon>
            </Button>
            {isFetching && <CircularProgress size={25} color="inherit" />}
          </FlexContainer>
          <FlexContainer fullWidth padding="0">
            {status === "success" && (
              <FilterListInput
                onChange={setFilterValue}
                placeholder="Name, League, Country"
              />
            )}
          </FlexContainer>
          <ScrollableContainer padding="5px" heightDiff={400} fullWidth>
            <FlexContainer column fullWidth>
              {teams &&
                getFilteredTeams()
                  .sort((teamA, teamB) =>
                    teamA.name.toLowerCase() > teamB.name.toLowerCase() ? 1 : -1
                  )
                  .map((team) => (
                    <TeamListItem
                      key={team.getId()}
                      team={team}
                      setSelectedTeam={setSelected}
                      selectedTeam={selectedTeam}
                      deleteTeamPrompt={deleteTeamPrompt}
                    />
                  ))}
            </FlexContainer>
          </ScrollableContainer>
        </ComponentLoader>
      </FlexContainer>
      <PromptDialog
        isOpen={isDeleteTeamPrompt}
        title="Delete Team"
        content={`Are you sure you want to delete ${
          selectedTeam?.getName() || ""
        }?`}
        confirmText="Delete"
        handleClose={closeDeletePrompt}
        handleConfirm={deleteSelectedTeam}
      />
      <NewTeamFormDialog />
    </Fragment>
  );
}
