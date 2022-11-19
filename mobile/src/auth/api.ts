import { configuredAxios } from '../axios/config';
import { LoginInput, LoginResponse, UserResponse } from './types';
import Constants from 'expo-constants';

export const authApi = configuredAxios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const loginUser = async (user: LoginInput) => {
  const response = await authApi.post<LoginResponse>('/auth/local', user);
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await authApi.get<LoginResponse>('/auth/refresh');
  return response.data;
};

export const whoAmI = async () => {
  const response = await authApi.get<UserResponse>('/users/me');
  return response.data;
};
