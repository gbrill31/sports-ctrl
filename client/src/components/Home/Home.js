import React, { useState, useEffect } from 'react';

import HeaderNav from '../HeaderNav/HeaderNav';
import NewGameDialog from '../NewGameDialog/NewGameDialog';
import './Home.scss';



function Home() {
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isNewGame, setIsNewGame] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [games, setGames] = useState(null);
  const [game, setGame] = useState(null);

  const checkDbConnection = () => {
    setIsConnecting(true);
    fetch('/connect/validate')
      .then((res) => {
        if (!res.ok) {
          throw new Error('connection timeout')
        }
        return res.json();
      })
      .then(() => {
        setIsConnecting(false);
        setIsDbConnected(true);
      })
      .catch((err) => {
        setIsConnecting(false);
        setIsDbConnected(false);
      });
  }

  const connectToDB = () => {
    fetch('/connect')
      .then((res) => {
        if (!res.ok) {
          throw new Error('connection timeout')
        }
        return res.json();
      })
      .then(() => {
        setIsConnecting(false);
        setIsDbConnected(true);
      })
      .catch((err) => {
        setIsConnecting(false);
        setIsDbConnected(false);
      });
  };


  const handleConnect = () => {
    if (!isDbConnected) {
      setIsConnecting(true);
      connectToDB();
    }
  };

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
        setGames(data);
        setIsSaving(false);
        setIsNewGame(false);
      })
      .catch(err => console.log(err));
  }

  const getAllGames = () => {
    fetch('/game/all')
      .then(res => res.json())
      .then(games => {
        console.log(games);
        setGames(games);
      })
      .catch(err => console.log(err));
  }


  const openNewGame = () => {
    setIsNewGame(true);
  };

  const handleClose = () => {
    setIsNewGame(false);
  };

  useEffect(() => {
    checkDbConnection();
  }, []);

  useEffect(() => {
    getAllGames();
    return () => {
      setGames(null);
    };
  }, [isDbConnected]);

  return (
    <div>
      <HeaderNav
        isDbConnected={isDbConnected}
        isConnecting={isConnecting}
        handleConnect={handleConnect}
        openNewGame={openNewGame}
      />
      <div className="games-wrapper">
        {
          games && games.map(game => (
            <div key={game.id} className="game-wrapper">
              <span className="team home">Home: {game.home}</span>
              <span>VS</span>
              <span className="team away">Away: {game.away}</span>
              <span className="game-venue">{game.venue}</span>
            </div>
          ))
        }
      </div>
      <NewGameDialog
        isOpen={isNewGame}
        handleClose={handleClose}
        handleConfirm={createNewGame}
        isSaving={isSaving}
      />
    </div>
  );
};

export default Home;