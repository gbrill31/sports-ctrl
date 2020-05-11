export const getAllTeams = async () => {
  const res = await fetch('/teams/all');
  if (res.status >= 400) throw new Error('No teams found');
  const teams = await res.json();
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
  if (res.status >= 400) throw new Error('New team creation failed');
  const newTeam = await res.json();
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
  if (res.status >= 400) throw new Error('Team deletion failed');
  const deletedTeam = await res.json();
  return deletedTeam;
};
