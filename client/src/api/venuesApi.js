export const getAllVenues = async () => {
  const res = await fetch('/venues/all');
  if (res.status >= 400) throw new Error('No venues found');
  const venues = await res.json();
  return venues;
};

export const saveNewVenue = async (venue) => {
  const body = JSON.stringify(venue);
  const res = await fetch('/venues/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  if (res.status >= 400) throw new Error('New venue creation failed');
  const newVenue = await res.json();
  return newVenue;
};

export const deleteVenue = async (id) => {
  const body = JSON.stringify({ id });
  const res = await fetch('/venues/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  if (res.status >= 400) throw new Error('New venue creation failed');
  const deletedVenue = await res.json();
  return deletedVenue;
};
