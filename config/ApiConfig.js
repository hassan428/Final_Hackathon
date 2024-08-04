import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL, TOKEN_NAME} from '@env';

export const apiHandle = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    ...axios.defaults.headers,
    'Content-Type': 'application/json',
  },
});

axios.defaults.timeout = 15000;

apiHandle.interceptors.request.use(async req => {
  const auth_token = (await AsyncStorage.getItem(TOKEN_NAME)) || '';
  if (auth_token) {
    req.headers.Authorization = `Bearer ${auth_token}`;
  }

  return req;
});
