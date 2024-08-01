import {apiHandle} from './ApiConfig';

export const api_signup = post_data => {
  return apiHandle.post('/signup', post_data);
};

export const api_login = post_data => {
  return apiHandle.post('/login', post_data);
};

export const api_auth_check = () => {
  return apiHandle.get('/auth_check');
};

export const api_verify_otp = post_data => {
  return apiHandle.post('/verify_otp', post_data);
};
export const api_send_otp = post_data => {
  return apiHandle.post('/send_otp', post_data);
};
export const api_update_profile = post_data => {
  return apiHandle.put('/update_profile', post_data);
};

export const api_create_team = post_data => {
  return apiHandle.post('/create_team', post_data);
};
