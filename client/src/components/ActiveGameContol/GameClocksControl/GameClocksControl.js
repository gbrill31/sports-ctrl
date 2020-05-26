import React from 'react';
import GameClock from './GameClock/GameClock';
import AttackClock from './AttackClock/AttackClock';
import {
  FlexContainer
} from '../../../styledElements';


export default function GameClocksControl({
  gameClockStartTime, attackClockStartTime
}) {

  return (
    <>
      <FlexContainer justify="center">
        <GameClock startTime={gameClockStartTime} />
        <AttackClock startTime={attackClockStartTime} />
      </FlexContainer>
    </>
  )
}
