export const getAllVenues = async () => {
  const res = await fetch('/venues/all');
  const venues = await res.json();
  if (res.status >= 400) {
    throw new Error('No venues found');
  }
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
  const newVenue = await res.json();
  if (res.status >= 400) {
    throw new Error('New venue creation failed');
  }
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
  const deletedVenue = await res.json();
  if (res.status >= 400) {
    throw new Error('New venue creation failed');
  }
  return deletedVenue;
};
