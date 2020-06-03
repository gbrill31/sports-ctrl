export const getAllGames = async () => {
  const res = await fetch('/games/all');
  if (res.status >= 400) throw new Error('No games found');
  const games = await res.json();
  return games;
}

export const createNewGame = async (game) => {
  const body = JSON.stringify(game);
  const res = await fetch('/games/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  if (res.status >= 400) throw new Error('New game creation failed');
  const newGame = await res.json();
  return newGame;
};

export const requestActiveGame = async () => {
  const res = await fetch('/games/active');
  if (res.status >= 400) throw new Error('Cannot Load Active Game');
  const activeGame = await res.json();
  return activeGame;
}

export const setGameScore = async (gameId, teamId, points) => {
  const body = JSON.stringify({ gameId, teamId, points });
  const res = await fetch('/games/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  if (res.status >= 400) throw new Error('Cannot set score in game');
  const activeGame = await res.json();
  return activeGame;
}
