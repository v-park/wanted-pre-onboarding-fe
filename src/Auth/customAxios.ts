import axios, { AxiosInstance } from 'axios';
import { MAIN_URL } from '../config/config';

const token = localStorage.getItem('access_token') || '';

export const customAxios: AxiosInstance = axios.create({
  baseURL: MAIN_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
