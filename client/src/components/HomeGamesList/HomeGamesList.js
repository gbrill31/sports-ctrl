import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { MainTitle, ScrollableContainer } from '../../styledElements';

import ComponentLoader from '../ComponentLoader/ComponentLoader';
import HomeGameListItem from '../HomeGameListItem/HomeGameListItem';
import useGames from '../../hooks/useGames';
import useDb from '../../hooks/useDb';

export default function HomeGamesList() {
  const history = useHistory();

  const [activeGame, setActiveGame] = useState(null);

  const { status: dbStatus } = useDb();
  const { status, data: games, isFetching } = useGames(dbStatus === 'success');

  useEffect(() => {
    if (games?.length) {
      const active = games.find((game) => game.active);
      setActiveGame(active);
    }
  }, [games]);

  const isGamesLoading = () => status === 'loading' || isFetching;

  const goToActiveGame = () => {
    history.push('/game');
  };

  return (
    <>
      <ComponentLoader loading={isGamesLoading()}>
        {activeGame && activeGame.id && (
          <>
            <MainTitle>Active Game</MainTitle>
            <HomeGameListItem goToActive={goToActiveGame} game={activeGame} />
          </>
        )}
        <MainTitle>Games Played</MainTitle>
        <ScrollableContainer fullWidth heightDiff={activeGame ? 292 : 137}>
          {games &&
            games
              .filter((game) => !game.active)
              .map((game) => <HomeGameListItem key={game.id} game={game} />)}
        </ScrollableContainer>
      </ComponentLoader>
    </>
  );
}
