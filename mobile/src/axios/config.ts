import axios from 'axios';
import { getAuthToken } from '../auth/AuthProvider';
import Constants from 'expo-constants';

const axiosInstance = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl,
  headers: {
    ['Content-Type']: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authToken = await getAuthToken();

    if (authToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${authToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const configuredAxios = axiosInstance;
