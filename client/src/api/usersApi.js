import axios from 'axios';

export const getUsersByAdmin = async () => {
  const { data } = await axios.get('/api/users/');
  return data;
};
