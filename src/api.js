import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const register = (userData) => axios.post(`${API_URL}/users/register`, userData);
const login = (credentials) => axios.post(`${API_URL}/users/login`, credentials);

export { register, login };