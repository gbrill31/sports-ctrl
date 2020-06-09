import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import {
  DialogActions, DialogTitle, DialogContent, Dialog
} from '@material-ui/core';
import { Button, ButtonIcon, FlexContainer } from '../../../styledElements';
import { faPlus, faMinus, faUndo, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import useFormInput from '../../../hooks/useFormInput';

import {
  setIsPlayerStatsDialog,
  setGameSelectedPlayer,
  updatePlayerStats,
  setGameScore,
  updateTeamFouls
} from '../../../actions';


const statChangeAnimation = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
`;


const DialogStatsContainer = styled.div`
  background-color: #fff;
  color: #333;
  text-transform: capitalize;


  h2{
    font-size: 2rem;
    font-weight: bold;
    color: #444;
    margin: 5px 0 10px 0;
  }
  h3{
    margin: 0;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 15px;
  }
`;

const StatDisplay = styled.div`
  color: ${props => props.color ? props.theme[props.color].color : props.theme.success.color};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 20px;

  h4{
    margin: 0;
    color: #777;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
    margin-left: 15px;
  }

  ${props => props.update && css`
    animation: ${statChangeAnimation} 0.2s ease-in-out alternate 2;
  `};
`;

const StatsControlContainer = styled.div`
  width: 100%;

  h2{
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }

  h3{
      margin: 0;
      color: #777;
      font-size: 1rem;
      text-transform: uppercase;
      font-weight: 400;
    }
`;

const StatsCourtContainer = styled.div`
  position: relative;
  
  img{
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

  div{
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
  top: ${props => props.top};
  left: ${props => props.left};
  display: ${props => props.active ? 'inherit' : 'none'};
  width: 20px;
  height: 20px;
  background-color: green;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

let xPos, yPos, pointsToAdd = 0, foulsToAdd = 0;


export default function SetPlayerStatsDialog() {
  const dispatch = useDispatch();

  const courtRegionRef = useRef(null);
  const markerRef = useRef(null);

  const {
    setPlayerStatsPending: isSaving,
    isSetPlayerStatsDialog,
    selectedPlayer,
    activeGameId,
    status
  } = useSelector(state => state.game);

  const [playerLocalStats, setPlayerLocalStats] = useState(null);
  const [isFoulsUpdate, setIsFoulsUpdate] = useState(false);
  const [isFtUpdate, setIsFtUpdate] = useState(false);
  const [isPointsUpdate, setIsPointsUpdate] = useState(false);
  const [is2fgUpdate, setIs2fgUpdate] = useState(false);
  const [is3fgUpdate, setIs3fgUpdate] = useState(false);
  const [isShowCourtMarker, setIsShowCourtMarker] = useState(false);
  const [isPointsSet, setIsPointsSet] = useState(false);
  const [pointsRegion, setPointsRegion] = useState(3);

  const clearSelectedPlayer = useCallback(() => dispatch(setGameSelectedPlayer(null)), [dispatch]);
  const closeDialog = useCallback(() => dispatch(setIsPlayerStatsDialog(false)), [dispatch]);
  const updateStats = useCallback((gameId, playerId, data) => dispatch(updatePlayerStats(gameId, playerId, data)), [dispatch]);
  const saveGameScore = useCallback((teamId, points) => dispatch(setGameScore(activeGameId, teamId, points)), [dispatch, activeGameId]);
  const saveTeamFouls = useCallback((teamId, fouls) => dispatch(updateTeamFouls(activeGameId, teamId, fouls)), [dispatch, activeGameId]);

  useEffect(() => {
    if (selectedPlayer) {
      const stats = selectedPlayer.getStats(activeGameId);
      const data = stats[selectedPlayer.getStatsDate()].data;
      setPlayerLocalStats(data);
      pointsToAdd = 0;
      foulsToAdd = 0;
    }
  }, [selectedPlayer, setPlayerLocalStats, activeGameId]);


  const savePlayerStats = () => {
    let statsData = { ...playerLocalStats };
    if (xPos && yPos) {
      statsData = {
        ...statsData, PtLocations: {
          ...statsData.PtLocations,
          [status]: [...statsData.PtLocations[status], {
            x: xPos,
            y: yPos
          }]
        }
      }
    }
    updateStats(activeGameId, selectedPlayer.getId(), statsData);
    saveGameScore(selectedPlayer.getTeamId(), pointsToAdd);
    saveTeamFouls(selectedPlayer.getTeamId(), foulsToAdd);
  }

  const initData = () => {
    setIsPointsSet(false);
    setIsShowCourtMarker(false);
  }

  const cancelSetPlayerStats = () => {
    clearSelectedPlayer();
    closeDialog();
  }

  const incremnetFouls = () => {
    if (playerLocalStats.FOULS < 5) {
      setIsFoulsUpdate(true);
      setPlayerLocalStats({ ...playerLocalStats, FOULS: playerLocalStats.FOULS + 1 });
      foulsToAdd += 1;
      setTimeout(() => setIsFoulsUpdate(false), 350);
    }
  }
  const decremnetFouls = () => {
    if (playerLocalStats.FOULS > 0) {
      setIsFoulsUpdate(true);
      setPlayerLocalStats({ ...playerLocalStats, FOULS: playerLocalStats.FOULS - 1 });
      foulsToAdd -= 1;
      setTimeout(() => setIsFoulsUpdate(false), 350);
    }
  }

  const incremnetFT = () => {
    setIsFtUpdate(true);
    setIsPointsUpdate(true);
    setPlayerLocalStats({
      ...playerLocalStats,
      FT: playerLocalStats.FT + 1,
      PT: playerLocalStats.PT + 1
    });
    pointsToAdd += 1;
    setTimeout(() => {
      setIsFtUpdate(false);
      setIsPointsUpdate(false);
    }, 350);
  }
  const decremnetFT = () => {
    setIsFtUpdate(true);
    setIsPointsUpdate(true);
    setPlayerLocalStats({
      ...playerLocalStats,
      FT: playerLocalStats.FT - 1,
      PT: playerLocalStats.PT - 1
    });
    pointsToAdd -= 1;
    setTimeout(() => {
      setIsFtUpdate(false);
      setIsPointsUpdate(false);
    }, 350);
  }

  const handleKeyDown = (e) => {
    const { keyCode, key } = e;
    if (keyCode === 13 || key === 'Enter') {
      savePlayerStats();
    }
  }

  const handlePointsClick = (e) => {
    if (!isPointsSet) {
      setIsShowCourtMarker(true);
      const rect = courtRegionRef.current.getBoundingClientRect();
      xPos = (e.pageX - rect.left) / rect.width * 100;
      yPos = (e.pageY - rect.top) / rect.height * 100;
      markerRef.current.style.top = `${yPos}%`;
      markerRef.current.style.left = `${xPos}%`;
      setIsPointsSet(true);
      const is2Points = pointsRegion === 2;
      setIsPointsUpdate(true);
      setIs2fgUpdate(is2Points);
      setIs3fgUpdate(!is2Points);
      setPlayerLocalStats({
        ...playerLocalStats,
        PT: playerLocalStats.PT + pointsRegion,
        '2FG': is2Points ? playerLocalStats['2FG'] + 2 : playerLocalStats['2FG'],
        '3FG': !is2Points ? playerLocalStats['3FG'] + 3 : playerLocalStats['3FG']
      });
      pointsToAdd += pointsRegion;
      setTimeout(() => {
        setIsPointsUpdate(false);
        setIs2fgUpdate(false);
        setIs3fgUpdate(false);
      }, 350);
    }
  }

  const undoPoints = () => {
    setIsShowCourtMarker(false);
    const is2Points = pointsRegion === 2;
    setIsPointsUpdate(true);
    setIs2fgUpdate(is2Points);
    setIs3fgUpdate(!is2Points);
    xPos = null;
    yPos = null;
    setPlayerLocalStats({
      ...playerLocalStats,
      PT: playerLocalStats.PT - pointsRegion,
      '2FG': is2Points ? playerLocalStats['2FG'] - 2 : playerLocalStats['2FG'],
      '3FG': !is2Points ? playerLocalStats['3FG'] - 3 : playerLocalStats['3FG'],
    });
    pointsToAdd -= pointsRegion;
    setIsPointsSet(false);
    setTimeout(() => {
      setIsPointsSet(false);
      setIs2fgUpdate(false);
      setIs3fgUpdate(false);
    }, 350);
  }

  const checkCourtPosition = (e) => {
    if (!isPointsSet) {
      setPointsRegion(e.target.id === "2pt-region" ? 2 : 3);
    }
  }



  return (
    <Fragment>
      {
        isSetPlayerStatsDialog && (
          <Dialog
            open={isSetPlayerStatsDialog}
            aria-labelledby="set player stats"
            onEscapeKeyDown={cancelSetPlayerStats}
            onEnter={initData}
            onKeyPress={handleKeyDown}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Set Player Game Stats - {selectedPlayer.getTeamName()}</DialogTitle>
            <DialogContent>
              <FlexContainer column justify="center" align="center" padding="0">
                <DialogStatsContainer>
                  <FlexContainer fullWidth justify="center" align="center" padding="0">
                    <h2>{selectedPlayer.getNumber()}</h2>
                    <h2 style={{ marginLeft: '10px' }}>{selectedPlayer.getName()}</h2>
                    {
                      playerLocalStats && (
                        <>
                          <FlexContainer fullWidth padding="0" justify="center" align="center" bgColor="#eaeaea">
                            <StatDisplay update={isPointsUpdate}>
                              POINTS: {playerLocalStats.PT}
                            </StatDisplay>
                            <StatDisplay
                              color={playerLocalStats.FOULS > 3 ? 'error' : 'primary'}
                              update={isFoulsUpdate}
                            >
                              FOULS: {playerLocalStats.FOULS}
                            </StatDisplay>
                            <FlexContainer>
                              <StatDisplay update={is2fgUpdate}>
                                <h4>2FG: {playerLocalStats['2FG']}</h4>
                              </StatDisplay>
                              <StatDisplay update={is3fgUpdate}>
                                <h4>3FG: {playerLocalStats['3FG']}</h4>
                              </StatDisplay>
                              <StatDisplay update={isFtUpdate}>
                                <h4>FT: {playerLocalStats.FT}</h4>
                              </StatDisplay>
                            </FlexContainer>
                          </FlexContainer>
                          <StatsControlContainer>
                            <FlexContainer column align="center" fullWidth>
                              <FlexContainer align="center" justify="center" >
                                <FlexContainer align="center" justify="center" column fullBorder>
                                  <h3>Free Throws</h3>
                                  <FlexContainer>
                                    <Button
                                      onClick={incremnetFT}
                                      color="success"
                                    >
                                      Add
                                    <ButtonIcon spaceLeft>
                                        <FontAwesomeIcon icon={faPlus} size="sm" />
                                      </ButtonIcon>
                                    </Button>
                                    <Button
                                      onClick={decremnetFT}
                                      color="primary"
                                    >
                                      Subtruct
                                    <ButtonIcon spaceLeft>
                                        <FontAwesomeIcon icon={faMinus} size="sm" />
                                      </ButtonIcon>
                                    </Button>
                                  </FlexContainer>
                                </FlexContainer>
                                <FlexContainer align="center" justify="center" column fullBorder>
                                  <h3>Fouls</h3>
                                  <FlexContainer>
                                    <Button
                                      onClick={incremnetFouls}
                                      color="success"
                                      disabled={playerLocalStats.FOULS === 5}
                                    >
                                      Fouls
                                    <ButtonIcon spaceLeft>
                                        <FontAwesomeIcon icon={faPlus} size="sm" />
                                      </ButtonIcon>
                                    </Button>
                                    <Button
                                      onClick={decremnetFouls}
                                      color="primary"
                                      disabled={playerLocalStats.FOULS === 0}
                                    >
                                      Fouls
                                    <ButtonIcon spaceLeft>
                                        <FontAwesomeIcon icon={faMinus} size="sm" />
                                      </ButtonIcon>
                                    </Button>
                                  </FlexContainer>
                                </FlexContainer>
                              </FlexContainer>
                              <FlexContainer align="center" justify="center" column>
                                <h3>Points</h3>
                                <FlexContainer align="flex-end" justify="center" fullWidth>
                                  <span style={{
                                    position: 'absolute',
                                    left: '20px',
                                    bottom: '2px'
                                  }}>
                                    <FontAwesomeIcon icon={faArrowLeft} size="sm" style={{ marginRight: '10px' }} />
                                    ATACK
                                  </span>
                                  <h2>{pointsRegion} Points</h2>
                                  {
                                    isPointsSet && (
                                      <Button
                                        color="error"
                                        onClick={undoPoints}
                                      >
                                        Undo
                                        <ButtonIcon spaceLeft>
                                          <FontAwesomeIcon icon={faUndo} size="sm" />
                                        </ButtonIcon>
                                      </Button>
                                    )
                                  }

                                </FlexContainer>
                                <StatsCourtContainer
                                  ref={courtRegionRef}
                                  onMouseMove={checkCourtPosition}
                                  onClick={handlePointsClick}
                                >
                                  <img alt="basketball court" src={require('../../../img/court.png')} />
                                  <StatsCourt2PointsRegion>
                                    <div
                                      id="2pt-region"
                                      onMouseMove={checkCourtPosition}
                                    />
                                  </StatsCourt2PointsRegion>
                                  <CourtPositionMarker
                                    active={isShowCourtMarker}
                                    ref={markerRef}
                                  >
                                  </CourtPositionMarker>

                                </StatsCourtContainer>
                              </FlexContainer>
                            </FlexContainer>
                          </StatsControlContainer>
                        </>
                      )
                    }
                  </FlexContainer>
                </DialogStatsContainer>
              </FlexContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelSetPlayerStats} color="error">
                Cancel
              </Button>
              <Button
                color="success"
                saving={isSaving}
                onClick={savePlayerStats}
              >
                {isSaving ? 'Saving...' : 'Save Stats'}
              </Button>

            </DialogActions>
          </Dialog>
        )
      }
    </Fragment>
  )
}
