import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
  baseURL: 'http://global.localhost:8000/api/v1/cms',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to include the token in all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized access. Please log in.');
      // Optional: Redirect to login page or take other actions
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  const response = await apiClient.post('/login', credentials);
  const token = response.data.token;
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('authToken', token);
  return response;
};

export const logout = async () => {
  await apiClient.post('/logout');
  delete apiClient.defaults.headers.common['Authorization'];
  localStorage.removeItem('authToken');
};

export const checkTokenValidity = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      await apiClient.get('/token-valid');
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
};

export default apiClient;
