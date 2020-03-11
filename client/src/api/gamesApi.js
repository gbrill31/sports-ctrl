export const getAllGames = async () => {
  const res = await fetch('/games/all');
  const games = await res.json();
  if (res.status >= 400) {
    throw new Error('No games found');
  }
  return games;
}

export const createNewGame = async (teams) => {
  const body = JSON.stringify(teams);
  const res = await fetch('/games/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  const game = await res.json();
  if (res.status >= 400) {
    throw new Error('New game creation failed');
  }
  return game;
};
