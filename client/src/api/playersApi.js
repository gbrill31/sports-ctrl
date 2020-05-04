export const getAllPlayers = async () => {
  const res = await fetch('/players/all');
  const players = await res.json();
  if (res.status >= 400) {
    throw new Error('No players found');
  }
  return players;
};

export const getPlayersByTeam = async (teamId) => {
  const res = await fetch(`/players/team?id=${teamId}`);
  const players = await res.json();
  if (res.status >= 400) {
    throw new Error('No players found');
  }
  return players;
};

export const savePlayersToTeam = async (players) => {
  const body = JSON.stringify(players);
  const res = await fetch('/players/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  const newPlayers = await res.json();
  if (res.status >= 400) {
    throw new Error('New players creation failed');
  }
  return newPlayers;
};

export const deletePlayer = async (id) => {
  const body = JSON.stringify({ id });
  const res = await fetch('/players/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  const deletedPlayer = await res.json();
  if (res.status >= 400) {
    throw new Error('Player deletion failed');
  }
  return deletedPlayer;
};
