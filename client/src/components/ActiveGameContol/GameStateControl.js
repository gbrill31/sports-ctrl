import React from 'react';

import GameClock from './GameClocksControl/GameClock/GameClock';
import AttackClock from './GameClocksControl/AttackClock/AttackClock';
import QuarterControl from './QuarterControl/QuarterControl';

import { FlexContainer, MainTitle, SubTitle } from '../../styledElements';
import { useSelector } from 'react-redux';
import useLeague from '../../hooks/reactQuery/useLeague';

export default function GameStateControl() {
  const { leagueId } = useSelector((state) => state.game);

  const { data: league } = useLeague(leagueId);

  return (
    <FlexContainer column justify="center" align="center" borderRight>
      <SubTitle align="center" padding="0">
        {league && league.name}
      </SubTitle>
      <MainTitle soft uppercase align="center" padding="5px">
        Game State Control
      </MainTitle>
      <FlexContainer column justify="center" align="center">
        {league && (
          <>
            <QuarterControl league={league} />
            <GameClock league={league} />
            <AttackClock league={league} />
          </>
        )}
      </FlexContainer>
    </FlexContainer>
  );
}
