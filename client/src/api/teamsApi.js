export const getAllTeams = async () => {
  const res = await fetch('/teams/all');
  const teams = await res.json();
  if (res.status >= 400) {
    throw new Error('No teams found');
  }
  return teams;
};

export const saveNewTeam = async (team) => {
  const body = JSON.stringify(team);
  const res = await fetch('/teams/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  const newTeam = await res.json();
  if (res.status >= 400) {
    throw new Error('New team creation failed');
  }
  return newTeam;
};

export const deleteTeam = async (id) => {
  const body = JSON.stringify({ id });
  const res = await fetch('/teams/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  const deletedTeam = await res.json();
  if (res.status >= 400) {
    throw new Error('New team creation failed');
  }
  return deletedTeam;
};
