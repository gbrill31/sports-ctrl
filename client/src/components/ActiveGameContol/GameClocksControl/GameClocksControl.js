import React from 'react';
import GameClock from './GameClock/GameClock';
import AttackClock from './AttackClock/AttackClock';
import {
  FlexContainer
} from '../../../styledElements';

const ATTACK_TIME_SECONDS = 24;
const Q_TIME_MINUTES = 0.1;

export default function GameClocksControl() {

  return (
    <>
      <FlexContainer justify="center">
        <GameClock
          startTimeMinutes={Q_TIME_MINUTES}
        />
        <AttackClock
          startTimeSeconds={ATTACK_TIME_SECONDS}
        />
      </FlexContainer>
    </>
  )
}
