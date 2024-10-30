import axios from 'axios';
import Constants from 'expo-constants';

const { baseURL } = Constants.expoConfig.extra;

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let token = null;

export const setAuthToken = (authToken) => {
  token = authToken;
};

apiClient.interceptors.request.use(
  config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;