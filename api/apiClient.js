import axios from 'axios';
import Constants from 'expo-constants';

const { baseURL } = Constants.expoConfig.extra;

// Configura la instancia de Axios
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para establecer el token
let token = null;

export const setAuthToken = (authToken) => {
  token = authToken;
};

// Interceptor para agregar el token a las solicitudes
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