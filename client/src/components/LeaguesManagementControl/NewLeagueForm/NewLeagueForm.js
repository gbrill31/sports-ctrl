import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useSaveLeague from '../../../hooks/reactQuery/useSaveLeague';
import { Button, FlexContainer, FormError } from '../../../styledElements';
import { Input } from '../../../styledElements';

import {
  convertMinToMilli,
  convertSecToMilli,
  convertMilliToMin,
  convertMilliToSec,
  getClockFormat,
  calcClockRemainingSeconds,
} from '../../../utils';

const FormContainer = styled.div`
  color: #fff;

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid ${(props) => props.theme.primary.hover};
    margin: 10px 0;
    padding: 10px;
  }

  h4 {
    font-size: 0.8rem;
    box-sizing: border-box;
    text-align: center;
    margin: 10px 0 0 0;
  }
`;

export default function NewLeagueForm({ cb, league }) {
  const [isGameHalves, setIsGameHalves] = useState(league?.isHalves);

  const { register, setValue, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: league?.name || '',
      country: league?.country || '',
      gameClockMinutes: getClockFormat(
        convertMilliToMin(league?.quarterStartTime) || 12
      ),
      gameClockSeconds: getClockFormat(
        calcClockRemainingSeconds(league?.quarterStartTime) || 0
      ),
      maxTimeoutCount: league?.maxTimeoutCount || 7,
      timeoutClockMinutes: getClockFormat(
        convertMilliToMin(league?.timeoutStartTime) || 1
      ),
      timeoutClockSeconds: getClockFormat(
        calcClockRemainingSeconds(league?.timeoutStartTime) || 15
      ),
      attackStartTime: getClockFormat(
        convertMilliToSec(league?.attackStartTime) || 24
      ),
      maxOvertimeTimeout: league?.maxOvertimeTimeoutCount || 2,
      maxTeamFouls: league?.maxTeamFoulsCount || 4,
      maxPlayerFouls: league?.maxPlayerFoulsCount || 6,
      maxTechPlayerFouls: league?.maxTechFoulsCount || 16,
    },
  });

  const { saveLeague, status } = useSaveLeague(cb);

  const handleClockChange = (e) => {
    const { id, value } = e.target;
    setValue(id, getClockFormat(value));
  };

  const handleHalvesChange = () => setIsGameHalves(!isGameHalves);

  const onSubmit = async (data) => {
    const {
      name,
      country,
      gameClockMinutes,
      gameClockSeconds,
      timeoutClockMinutes,
      timeoutClockSeconds,
      attackStartTime,
      maxTimeoutCount,
      maxOvertimeTimeout,
      maxTeamFouls,
      maxPlayerFouls,
      maxTechPlayerFouls,
    } = data;
    const gameStartTime =
      convertMinToMilli(parseInt(gameClockMinutes)) +
      convertSecToMilli(parseInt(gameClockSeconds));
    const timeoutStartTime =
      convertMinToMilli(parseInt(timeoutClockMinutes)) +
      convertSecToMilli(parseInt(timeoutClockSeconds));

    const leagueData = {
      id: league?.id,
      name,
      country,
      isHalves: isGameHalves,
      quarterStartTime: parseInt(gameStartTime),
      attackStartTime: parseInt(convertSecToMilli(attackStartTime)),
      timeoutStartTime: parseInt(timeoutStartTime),
      maxTimeoutCount: parseInt(maxTimeoutCount),
      maxOvertimeTimeoutCount: parseInt(maxOvertimeTimeout),
      maxTeamFoulsCount: parseInt(maxTeamFouls),
      maxPlayerFoulsCount: parseInt(maxPlayerFouls),
      maxTechFoulsCount: parseInt(maxTechPlayerFouls),
    };
    saveLeague(leagueData);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FlexContainer
          column
          noWrap
          justify="center"
          align="center"
          padding="0"
        >
          <h3>General Info</h3>
          <FlexContainer justify="center" align="center" fullWidth noWrap>
            <FlexContainer column padding="0">
              <Input
                required
                autoFocus
                width="12rem"
                color="#fff"
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                spaceRight
                error={errors.name}
                ref={register({ required: true })}
              />
              {errors.name && <FormError>* This field is required</FormError>}
            </FlexContainer>
            <Input
              spaceLeft
              width="10rem "
              color="#fff"
              id="country"
              name="country"
              type="text"
              placeholder="Country"
              error={errors.country}
              ref={register}
            />
          </FlexContainer>
          <FlexContainer justify="center" align="center" fullWidth>
            <h3>
              Game Clock
              <span style={{ marginLeft: '10px' }}>
                <Input
                  type="checkbox"
                  id="gameHalves"
                  name="gameHalves"
                  marginBottom="0"
                  spaceLeft
                  value={isGameHalves}
                  checked={isGameHalves}
                  onChange={handleHalvesChange}
                />
                Halves
              </span>
            </h3>
          </FlexContainer>
          <FlexContainer justify="center" align="center" noWrap>
            <FlexContainer justify="center" align="center" column>
              <h4>{isGameHalves ? 'Half' : 'Quarter'} Start Time</h4>
              <FlexContainer justify="center" align="center" padding="0">
                <Input
                  id="gameClockMinutes"
                  name="gameClockMinutes"
                  color="#fff"
                  onChange={handleClockChange}
                  type="number"
                  min="0"
                  width="1.5rem"
                  align="center"
                  marginBottom="0"
                  ref={register}
                />
                <span>:</span>
                <Input
                  id="gameClockSeconds"
                  name="gameClockSeconds"
                  color="#fff"
                  onChange={handleClockChange}
                  type="number"
                  min="0"
                  max="59"
                  width="1.5rem"
                  align="center"
                  marginBottom="0"
                  ref={register({ min: 0, max: 59 })}
                />
              </FlexContainer>
            </FlexContainer>
            <FlexContainer justify="center" align="center" column>
              <h4>Attack Start Time</h4>
              <FlexContainer justify="center" align="center" padding="0">
                <Input
                  id="attackStartTime"
                  name="attackStartTime"
                  color="#fff"
                  onChange={handleClockChange}
                  type="number"
                  min="0"
                  max="59"
                  width="1.5rem"
                  align="center"
                  marginBottom="0"
                  ref={register({ min: 0, max: 59 })}
                />
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <h3>Timeouts</h3>
          <FlexContainer justify="center" align="center" column>
            <FlexContainer justify="center" align="center" noWrap>
              <FlexContainer column justify="center" align="center">
                <h4>Max per Game</h4>
                <FlexContainer column padding="0">
                  <Input
                    width="2rem"
                    id="maxTimeoutCount"
                    name="maxTimeoutCount"
                    color="#fff"
                    type="number"
                    min="0"
                    align="center"
                    marginBottom="0"
                    placeholder="Timeouts Count"
                    spaceRight
                    ref={register({ required: true })}
                  />
                  {errors.maxTimeoutCount && (
                    <FormError>* This field is required</FormError>
                  )}
                </FlexContainer>
              </FlexContainer>
              <FlexContainer column justify="center" align="center">
                <h4>Start Time</h4>
                <FlexContainer justify="center" align="center" padding="0">
                  <Input
                    id="timeoutClockMinutes"
                    name="timeoutClockMinutes"
                    spaceLeft
                    color="#fff"
                    onChange={handleClockChange}
                    type="number"
                    min="0"
                    width="1.5rem"
                    align="center"
                    marginBottom="0"
                    ref={register}
                  />
                  <span>:</span>
                  <Input
                    id="timeoutClockSeconds"
                    name="timeoutClockSeconds"
                    color="#fff"
                    onChange={handleClockChange}
                    type="number"
                    min="0"
                    max="59"
                    width="1.5rem"
                    align="center"
                    marginBottom="0"
                    ref={register({ min: 0, max: 59 })}
                  />
                </FlexContainer>
              </FlexContainer>
              <FlexContainer column justify="center" align="center">
                <h4>Max per Overtime</h4>
                <FlexContainer column padding="0">
                  <Input
                    width="2rem"
                    id="maxOvertimeTimeout"
                    name="maxOvertimeTimeout"
                    color="#fff"
                    type="number"
                    min="0"
                    align="center"
                    placeholder="Overtime Count"
                    marginBottom="0"
                    ref={register({ required: true })}
                  />
                  {errors.maxOvertimeTimeout && (
                    <FormError>* This field is required</FormError>
                  )}
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <h3>Game Fouls</h3>
          <FlexContainer justify="center" align="center">
            <FlexContainer justify="center" align="center" column>
              <h4>Max per Team</h4>
              <FlexContainer column padding="0">
                <Input
                  width="2rem"
                  id="maxTeamFouls"
                  name="maxTeamFouls"
                  color="#fff"
                  type="number"
                  min="0"
                  align="center"
                  placeholder="Team"
                  marginBottom="0"
                  ref={register({ required: true })}
                />
                {errors.maxTeamFouls && (
                  <FormError>* This field is required</FormError>
                )}
              </FlexContainer>
            </FlexContainer>
            <FlexContainer justify="center" align="center" column>
              <h4>Max per Player</h4>
              <FlexContainer column padding="0">
                <Input
                  width="2rem"
                  id="maxPlayerFouls"
                  name="maxPlayerFouls"
                  color="#fff"
                  type="number"
                  min="0"
                  align="center"
                  placeholder="Player"
                  marginBottom="0"
                  ref={register({ required: true })}
                />
                {errors.maxPlayerFouls && (
                  <FormError>* This field is required</FormError>
                )}
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <h3>League Fouls</h3>
          <FlexContainer justify="center" align="center">
            <FlexContainer justify="center" align="center" column>
              <h4>Max Technical per Player</h4>
              <FlexContainer column padding="0">
                <Input
                  width="2rem"
                  id="maxTechPlayerFouls"
                  name="maxTechPlayerFouls"
                  color="#fff"
                  type="number"
                  min="0"
                  align="center"
                  placeholder="Technical"
                  marginBottom="0"
                  ref={register({ required: true })}
                />
                {errors.maxTechPlayerFouls && (
                  <FormError>* This field is required</FormError>
                )}
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <Button
            type="submit"
            color="success"
            saving={status === 'pending'}
            width="40%"
            margin="40px 0 5px 0"
          >
            Save
          </Button>
        </FlexContainer>
      </form>
    </FormContainer>
  );
}
