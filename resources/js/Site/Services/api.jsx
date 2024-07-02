import axios from 'axios';

const getBaseURL = () => {
  const hostname = window.location.hostname;
  if (hostname.startsWith('global')) {
    return 'https://global.bl-india.com/api/v1/fe';
  } else if (hostname.startsWith('in')) {
    return 'https://in.bl-india.com/api/v1/fe';
  }
  return 'http://localhost:8000/api/v1/fe'; // Default to local
};

const getLocale = () => {
  return localStorage.getItem('locale') || 'en'; // Default to 'en' if locale is not set
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const locale = getLocale();
  config.headers['Accept-Language'] = locale;
  config.headers['current-locale'] = locale;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
