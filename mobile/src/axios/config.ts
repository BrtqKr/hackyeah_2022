import axios from 'axios';
import { getAuthToken } from '../auth/AuthProvider';

axios.interceptors.request.use(
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

export const configuredAxios = axios;
