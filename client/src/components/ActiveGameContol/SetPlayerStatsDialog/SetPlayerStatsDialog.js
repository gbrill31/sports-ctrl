import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { Button, Icon, FlexContainer } from "../../../styledElements";
import {
  faPlus,
  faMinus,
  faUndo,
  faArrowLeft,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PromptDialog from "../../PromptDialog/PromptDialog";
import ModalDialog from "../../ModalDialog/ModalDialog";
import PlayerStatsDisplay from "../../PlayerStatsDisplay/PlayerStatsDisplay";

import {
  setIsPlayerStatsDialog,
  setGameSelectedPlayer,
  updatePlayerStats,
  updateGameScore,
  updateTeamFouls,
} from "../../../actions";

const DialogStatsContainer = styled.div`
  background-color: #fff;
  color: #333;
  text-transform: capitalize;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #444;
    margin: 5px 0 10px 0;
  }
  h3 {
    margin: 0;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 15px;
  }
`;

const StatsControlContainer = styled.div`
  width: 100%;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }

  h3 {
    margin: 0;
    color: #777;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
    align-self: center;
  }
`;

const StatsCourtContainer = styled.div`
  position: relative;

  img {
    width: 100%;
  }
`;

const StatsCourt2PointsRegion = styled.div`
  position: absolute;
  width: 61%;
  height: 81%;
  overflow: hidden;
  top: 9%;
  left: 1%;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    background: red;
    opacity: 0.2;
    top: 0;
    left: -50%;
    border-radius: 45%;
  }
`;

const CourtPositionMarker = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  display: ${(props) => (props.active ? "inherit" : "none")};
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.success.color};
  border-radius: 50%;
  transform: translate(-50%, -50%);

  ${(props) =>
    props.hoverActive &&
    css`
      &:hover {
        background-color: ${(props) => props.theme.error.color};
        border: 1px solid #444;
        cursor: pointer;
      }
    `}
`;

let xPos,
  yPos,
  pointsToAdd = 0,
  foulsToAdd = 0,
  pointToDelete;

export default function SetPlayerStatsDialog() {
  const dispatch = useDispatch();

  const courtRegionRef = useRef(null);
  const markerRef = useRef(null);

  const gameTime = localStorage.getItem("gameClock");

  const {
    setPlayerStatsPending: isSaving,
    isSetPlayerStatsDialog,
    selectedPlayer,
    id: activeGameId,
    status,
  } = useSelector((state) => state.game);

  const [playerLocalStats, setPlayerLocalStats] = useState(null);
  const [isShowCourtMarker, setIsShowCourtMarker] = useState(false);
  const [isPointsSet, setIsPointsSet] = useState(false);
  const [pointsRegion, setPointsRegion] = useState(3);
  const [isEditPoints, setIsEditPoints] = useState(false);
  const [isEditPointsPrompt, setIsEditPointsPrompt] = useState(false);

  const clearSelectedPlayer = useCallback(
    () => dispatch(setGameSelectedPlayer(null)),
    [dispatch]
  );
  const closeDialog = useCallback(
    () => dispatch(setIsPlayerStatsDialog(false)),
    [dispatch]
  );
  const updateStats = useCallback(
    (playerId, data) =>
      dispatch(updatePlayerStats(activeGameId, playerId, data)),
    [dispatch, activeGameId]
  );
  const saveGameScore = useCallback(
    (teamId, points) => dispatch(updateGameScore(activeGameId, teamId, points)),
    [dispatch, activeGameId]
  );
  const saveTeamFouls = useCallback(
    (teamId, fouls) => dispatch(updateTeamFouls(activeGameId, teamId, fouls)),
    [dispatch, activeGameId]
  );

  useEffect(() => {
    if (selectedPlayer) {
      setPlayerLocalStats(selectedPlayer.getStats(activeGameId).data);
      setIsEditPoints(false);
      pointsToAdd = 0;
      foulsToAdd = 0;
      pointToDelete = null;
    }
  }, [selectedPlayer, setPlayerLocalStats, activeGameId]);

  const enableEditPoints = () => setIsEditPoints(true);
  const disableEditPoints = () => setIsEditPoints(false);

  const openEditPointsDialog = (point) => () => {
    pointToDelete = point;
    setIsEditPointsPrompt(true);
  };
  const handleCancelPointsPrompt = () => setIsEditPointsPrompt(false);

  const deletePointsConfirm = () => {
    let statsData = { ...playerLocalStats };
    const ptArray = [...statsData.PtLocations[status]];
    ptArray.splice(pointToDelete.index, 1);
    const is2Points = pointToDelete.pt === 2;
    statsData = {
      ...statsData,
      PtLocations: {
        ...statsData.PtLocations,
        [status]: ptArray,
      },
      PT: playerLocalStats.PT - pointToDelete.pt,
      "2FG": is2Points ? playerLocalStats["2FG"] - 2 : playerLocalStats["2FG"],
      "3FG": !is2Points ? playerLocalStats["3FG"] - 3 : playerLocalStats["3FG"],
    };
    pointsToAdd = -pointToDelete.pt;
    setPlayerLocalStats(statsData);
    disableEditPoints();
    handleCancelPointsPrompt();
  };

  const savePlayerStats = () => {
    let statsData = { ...playerLocalStats };
    if (xPos && yPos) {
      statsData = {
        ...statsData,
        PtLocations: {
          ...statsData.PtLocations,
          [status]: [
            ...statsData.PtLocations[status],
            {
              gameTime,
              pt: pointsRegion,
              x: xPos,
              y: yPos,
            },
          ],
        },
      };
    }

    updateStats(selectedPlayer.getId(), statsData);
    saveGameScore(selectedPlayer.getTeamId(), pointsToAdd);
    saveTeamFouls(selectedPlayer.getTeamId(), foulsToAdd);
  };

  const initData = () => {
    setIsPointsSet(false);
    setIsShowCourtMarker(false);
  };

  const cancelSetPlayerStats = () => {
    clearSelectedPlayer();
    closeDialog();
  };

  const incremnetFouls = () => {
    if (playerLocalStats.FOULS < 5) {
      setPlayerLocalStats({
        ...playerLocalStats,
        FOULS: playerLocalStats.FOULS + 1,
      });
      foulsToAdd += 1;
    }
  };
  const decremnetFouls = () => {
    if (playerLocalStats.FOULS > 0) {
      setPlayerLocalStats({
        ...playerLocalStats,
        FOULS: playerLocalStats.FOULS - 1,
      });
      foulsToAdd -= 1;
    }
  };

  const incremnetFT = () => {
    setPlayerLocalStats({
      ...playerLocalStats,
      FT: playerLocalStats.FT + 1,
      PT: playerLocalStats.PT + 1,
    });
    pointsToAdd += 1;
  };
  const decremnetFT = () => {
    setPlayerLocalStats({
      ...playerLocalStats,
      FT: playerLocalStats.FT - 1,
      PT: playerLocalStats.PT - 1,
    });
    pointsToAdd -= 1;
  };

  const handlePointsClick = (e) => {
    if (!isPointsSet && !isEditPoints) {
      setIsShowCourtMarker(true);
      const rect = courtRegionRef.current.getBoundingClientRect();
      xPos = ((e.pageX - rect.left) / rect.width) * 100;
      yPos = ((e.pageY - rect.top) / rect.height) * 100;
      markerRef.current.style.top = `${yPos}%`;
      markerRef.current.style.left = `${xPos}%`;
      setIsPointsSet(true);
      const is2Points = pointsRegion === 2;
      setPlayerLocalStats({
        ...playerLocalStats,
        PT: playerLocalStats.PT + pointsRegion,
        "2FG": is2Points
          ? playerLocalStats["2FG"] + 2
          : playerLocalStats["2FG"],
        "3FG": !is2Points
          ? playerLocalStats["3FG"] + 3
          : playerLocalStats["3FG"],
      });
      pointsToAdd += pointsRegion;
    }
  };

  const undoPoints = () => {
    setIsShowCourtMarker(false);
    const is2Points = pointsRegion === 2;
    xPos = null;
    yPos = null;
    setPlayerLocalStats({
      ...playerLocalStats,
      PT: playerLocalStats.PT - pointsRegion,
      "2FG": is2Points ? playerLocalStats["2FG"] - 2 : playerLocalStats["2FG"],
      "3FG": !is2Points ? playerLocalStats["3FG"] - 3 : playerLocalStats["3FG"],
    });
    pointsToAdd -= pointsRegion;
    setIsPointsSet(false);
  };

  const checkCourtPosition = (e) => {
    if (!isPointsSet) {
      setPointsRegion(e.target.id === "2pt-region" ? 2 : 3);
    }
  };

  return (
    <>
      <ModalDialog
        isOpen={isSetPlayerStatsDialog}
        handleCancel={cancelSetPlayerStats}
        handleConfirm={savePlayerStats}
        title={`Set Player Game Stats - ${selectedPlayer?.getTeamName()}`}
        label="set player stats"
        onOpen={initData}
        saving={isSaving}
      >
        <FlexContainer column justify="center" align="center" padding="0">
          <DialogStatsContainer>
            <FlexContainer
              fullWidth
              justify="center"
              align="center"
              padding="0"
            >
              <h2>{selectedPlayer?.getNumber()}</h2>
              <h2 style={{ marginLeft: "10px" }}>
                {selectedPlayer?.getName()}
              </h2>
              {playerLocalStats && (
                <>
                  <PlayerStatsDisplay stats={playerLocalStats} />
                  <StatsControlContainer>
                    <FlexContainer
                      column
                      align="center"
                      justify="flex-start"
                      fullWidth
                    >
                      <FlexContainer align="center" justify="center">
                        <FlexContainer
                          align="center"
                          justify="center"
                          column
                          fullBorder
                        >
                          <h3>Edit Points</h3>
                          <FlexContainer>
                            {!isEditPoints ? (
                              <Button
                                onClick={enableEditPoints}
                                color="secondary"
                                disabled={isPointsSet}
                              >
                                Edit
                                <Icon spaceLeft>
                                  <FontAwesomeIcon icon={faEdit} size="sm" />
                                </Icon>
                              </Button>
                            ) : (
                              <Button onClick={disableEditPoints} color="error">
                                Close
                                <Icon spaceLeft>
                                  <FontAwesomeIcon icon={faTimes} size="sm" />
                                </Icon>
                              </Button>
                            )}
                          </FlexContainer>
                        </FlexContainer>
                        <FlexContainer
                          align="center"
                          justify="center"
                          column
                          fullBorder
                        >
                          <h3>Free Throws</h3>
                          <FlexContainer>
                            <Button onClick={incremnetFT} color="success">
                              Add
                              <Icon spaceLeft>
                                <FontAwesomeIcon icon={faPlus} size="sm" />
                              </Icon>
                            </Button>
                            <Button
                              onClick={decremnetFT}
                              color="primary"
                              disabled={playerLocalStats.FT === 0}
                            >
                              Subtruct
                              <Icon spaceLeft>
                                <FontAwesomeIcon icon={faMinus} size="sm" />
                              </Icon>
                            </Button>
                          </FlexContainer>
                        </FlexContainer>
                        <FlexContainer
                          align="center"
                          justify="center"
                          column
                          fullBorder
                        >
                          <h3>Fouls</h3>
                          <FlexContainer>
                            <Button
                              onClick={incremnetFouls}
                              color="success"
                              disabled={playerLocalStats.FOULS === 5}
                            >
                              Fouls
                              <Icon spaceLeft>
                                <FontAwesomeIcon icon={faPlus} size="sm" />
                              </Icon>
                            </Button>
                            <Button
                              onClick={decremnetFouls}
                              color="primary"
                              disabled={playerLocalStats.FOULS === 0}
                            >
                              Fouls
                              <Icon spaceLeft>
                                <FontAwesomeIcon icon={faMinus} size="sm" />
                              </Icon>
                            </Button>
                          </FlexContainer>
                        </FlexContainer>
                      </FlexContainer>
                      <FlexContainer align="flex-start" justify="center" column>
                        <h3>Points</h3>
                        <FlexContainer
                          align="flex-end"
                          justify="center"
                          fullWidth
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: "20px",
                              bottom: "2px",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faArrowLeft}
                              size="sm"
                              style={{ marginRight: "10px" }}
                            />
                            ATACK
                          </span>
                          <h2>{pointsRegion} Points</h2>
                          {isPointsSet && (
                            <Button color="error" onClick={undoPoints}>
                              Undo
                              <Icon spaceLeft>
                                <FontAwesomeIcon icon={faUndo} size="sm" />
                              </Icon>
                            </Button>
                          )}
                        </FlexContainer>
                        <StatsCourtContainer
                          ref={courtRegionRef}
                          onMouseMove={checkCourtPosition}
                          onClick={handlePointsClick}
                        >
                          <img
                            alt="basketball court"
                            src={require("../../../img/court.png")}
                          />
                          {isEditPoints ? (
                            playerLocalStats.PtLocations[status].map(
                              (ptItem, index) => (
                                <CourtPositionMarker
                                  active
                                  hoverActive
                                  key={ptItem.x + ptItem.y + index}
                                  top={`${ptItem.y}%`}
                                  left={`${ptItem.x}%`}
                                  onClick={openEditPointsDialog({
                                    ...ptItem,
                                    index,
                                  })}
                                ></CourtPositionMarker>
                              )
                            )
                          ) : (
                            <>
                              <StatsCourt2PointsRegion>
                                <div
                                  id="2pt-region"
                                  onMouseMove={checkCourtPosition}
                                />
                              </StatsCourt2PointsRegion>
                              <CourtPositionMarker
                                active={isShowCourtMarker}
                                ref={markerRef}
                              ></CourtPositionMarker>
                            </>
                          )}
                        </StatsCourtContainer>
                      </FlexContainer>
                    </FlexContainer>
                  </StatsControlContainer>
                </>
              )}
            </FlexContainer>
          </DialogStatsContainer>
        </FlexContainer>
      </ModalDialog>
      <PromptDialog
        isOpen={isEditPointsPrompt}
        title="Delete Selected Points"
        content="Are you sure you want to delete the selected points?"
        confirmText="Delete"
        handleClose={handleCancelPointsPrompt}
        handleConfirm={deletePointsConfirm}
      />
    </>
  );
}
