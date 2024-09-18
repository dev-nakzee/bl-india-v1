import axios from 'axios';
import { toast } from 'react-toastify';

const getBaseURL = () => {
  const hostname = window.location.hostname;
  if (hostname.startsWith('global')) {
    // return 'https://global.bl-india.com/api/v1/cms';
    return 'http://global.localhost:8000/api/v1/cms';
  } else if (hostname.startsWith('in')) {
    // return 'https://in.bl-india.com/api/v1/cms';
    return 'http://in.localhost:8000/api/v1/cms';
  } 
  return 'http://bl-india.com/api/v1/cms'; // Default to local
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to include the token and CSRF token in all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    const csrfToken = localStorage.getItem('csrfToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
    config.baseURL = getBaseURL(); // Dynamically set baseURL before each request
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
  const { token, user } = response.data;
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user)); // Store user details
  return response;
};

export const logout = async () => {
  await apiClient.post('/logout');
  delete apiClient.defaults.headers.common['Authorization'];
  localStorage.removeItem('authToken');
  localStorage.removeItem('user'); // Remove user details
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
