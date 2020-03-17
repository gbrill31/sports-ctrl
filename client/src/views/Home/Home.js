import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MainTitle } from '../../styledElements';
import GamesList from '../../components/GamesList/GamesList';

import './Home.scss';

import {
  getAllGames
} from '../../actions';


function Home() {
  const dispatch = useDispatch();

  const isDBConnected = useSelector(state => state.db.isConnected);
  const games = useSelector(state => state.games.played);
  const gamesLoading = useSelector(state => state.games.getGamesPending);

  const getPlayedGames = useCallback(() => dispatch(getAllGames()), [dispatch]);

  useEffect(() => {
    if (isDBConnected) {
      getPlayedGames();
    }
  }, [isDBConnected, getPlayedGames]);


  return (
    <div>
      <MainTitle>Games Played</MainTitle>
      <GamesList games={games} isLoading={gamesLoading} />
    </div>
  );
};

export default Home;