import axios from 'axios';
import { LoginInput, LoginResponse, UserResponse } from './types';
import Constants from 'expo-constants';

export const loginUser = async (user: LoginInput) => {
  const response = await axios.post<LoginResponse>(
    Constants.expoConfig?.extra?.apiUrl + '/auth/local',
    user,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await axios.get<LoginResponse>('/auth/refresh');
  return response.data;
};

export const whoAmI = async () => {
  const response = await axios.get<UserResponse>('/users/me');
  return response.data;
};
