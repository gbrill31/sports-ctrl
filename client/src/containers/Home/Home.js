import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
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

  const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: #762390;
  border: 1px solid #762070;
  display: inline-block;
  `;

  return (
    <div>
      <Title>Games</Title>
      <GamesList games={games} isLoading={gamesLoading} />
    </div>
  );
};

export default Home;