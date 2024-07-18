import axios from 'axios';
import {token_name} from '../utils/constants.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.43.130:5000';
// const baseURL = 'http://192.168.1.110:5000';

export const apiHandle = axios.create({
  baseURL,
  headers: {
    ...axios.defaults.headers,
    'Content-Type': 'application/json',
  },
});

axios.defaults.timeout = 15000;

apiHandle.interceptors.request.use(async req => {
  const auth_token = (await AsyncStorage.getItem(token_name)) || '';
  if (auth_token) {
    req.headers.Authorization = `Bearer ${auth_token}`;
  }

  return req;
});
