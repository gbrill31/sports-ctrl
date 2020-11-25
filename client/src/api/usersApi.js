import axios from 'axios';

export const getUsersByAdmin = async () => {
  const { data } = await axios.get('/api/users/');
  return data;
};

export const updateUser = async (user) => {
  const { data } = await axios.post('/api/users/update', user);
  return data;
};

export const deleteUsers = async (ids) => {
  const { data } = await axios.post('/api/users/delete', {
    ids: Array.isArray(ids) ? ids : [ids],
  });
  return data;
};
