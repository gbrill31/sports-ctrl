import axios from 'axios';

export const connectDB = async () => {
  const { data } = await axios.get('/connect');
  return data;
};
