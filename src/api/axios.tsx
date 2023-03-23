import axios from 'axios';

export default axios.create({
  baseURL: 'http://13.233.102.144:8000'
});

export const axiosPrivate = axios.create({
  baseURL: 'http://13.233.102.144:8000',
  headers: {'Content-Type':'application/json'},
  withCredentials: true
});