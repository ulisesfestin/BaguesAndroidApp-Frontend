import axios from 'axios';

// Configura la instancia de Axios
const apiClient = axios.create({
  baseURL: 'http://192.168.18.27:8080', // Reemplaza con la URL base de tu API
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