import api from './services/api';

export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  if(res.data.token){
    saveToken(res.data.token);
  }
  return res.data;
};

export const register = async (payload) => {
  const res = await api.post('/auth/register', payload);
  if(res.data.token){ saveToken(res.data.token); }
  return res.data;
};

export const me = async () => {
  const token = getToken();
  if(!token) return null;
  const res = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
