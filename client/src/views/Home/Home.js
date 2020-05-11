import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GamesList from '../../components/GamesList/GamesList';

import {
  getAllGames
} from '../../actions';


function Home() {
  const dispatch = useDispatch();

  const isDBConnected = useSelector(state => state.db.isConnected);

  const getPlayedGames = useCallback(() => dispatch(getAllGames()), [dispatch]);

  useEffect(() => {
    if (isDBConnected) {
      getPlayedGames();
    }
  }, [isDBConnected, getPlayedGames]);


  return (
    <div>
      <GamesList />
    </div>
  );
};

export default Home;