import { configuredAxios } from '../axios/config';
import { LoginInput, LoginResponse, UserResponse } from './types';
const API_BASE_URL = process.env.API_BASE_URL;


export const authApi = configuredAxios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const loginUser = async (user: LoginInput) => {
    // const response = await authApi.post<LoginResponse>('/auth/login', user);
    return {
        accessToken: 'bToken'
    }
};

export const refreshAccessToken = async () => {
    const response = await authApi.get<LoginResponse>('/auth/refresh');
    return response.data;
};

export const whoAmI = async () => {
    const response = await authApi.get<UserResponse>('/users/me');
    return response.data;  
}