import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL1,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
  timeout: 10000,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => error,
);

export { http };
