import axios from 'axios';

export const registerUser = async ({ name, email, password, type, admin }) => {
  const { data } = await axios.post('/register', {
    name,
    email,
    password,
    type,
    admin,
  });
  return data;
};

export const loginUser = async ({ email, password }) => {
  const { data } = await axios.post('/login', { email, password });
  return data;
};

export const logoutUser = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expires');
  const { data } = await axios.get('/logout');
  return data;
};

export const verifyLogin = async () => {
  const { data } = await axios.get('/verifylogin');
  return data;
};
