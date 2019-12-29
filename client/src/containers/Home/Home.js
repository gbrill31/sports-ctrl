import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NewGameDialog from '../../components/NewGameDialog/NewGameDialog';
import GamesList from '../../components/GamesList/GamesList';

import './Home.scss';

import {
  getAllGames
} from './actions';

const mapStateToProps = state => ({
  games: state.gamesPlayed.games
});

const mapDispatchToProps = dispatch => ({
  getPlayedGames: () => dispatch(getAllGames())
});


function Home({ games, getPlayedGames, isDbConnected }) {
  const [isNewGame, setIsNewGame] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const createNewGame = (teams) => {
    setIsSaving(true);
    const body = JSON.stringify(teams);
    fetch('/game/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(res => res.json())
      .then(data => {
        setIsSaving(false);
        setIsNewGame(false);
      })
      .catch(err => console.log(err));
  }


  // const openNewGame = () => {
  //   setIsNewGame(true);
  // };

  const handleClose = () => {
    setIsNewGame(false);
  };

  useEffect(() => {
    if (isDbConnected) {
      getPlayedGames();
    }
  }, [isDbConnected, getPlayedGames]);

  return (
    <div>
      <GamesList games={games} />
      <NewGameDialog
        isOpen={isNewGame}
        handleClose={handleClose}
        handleConfirm={createNewGame}
        isSaving={isSaving}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);