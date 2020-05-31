export const getAllPlayers = async () => {
  const res = await fetch('/players/all');
  if (res.status >= 400) throw new Error('No players found');
  const players = await res.json();
  return players;
};

export const getPlayersByTeamId = async (id) => {
  const res = await fetch(`/players/team?id=${id}`);
  if (res.status >= 400) throw new Error('No players found');
  const players = await res.json();
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
  if (res.status >= 400) throw new Error('New players creation failed');
  const newPlayers = await res.json();
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
  if (res.status >= 400) throw new Error('Player deletion failed');
  const deletedPlayer = await res.json();
  return deletedPlayer;
};
