import axios from 'axios';

const getBaseURL = () => {
  const hostname = window.location.hostname;
  // if (hostname.startsWith('global')) {
  //   // return 'https://global.bl-india.com/api/v1/fe';
  //   return 'http://global.localhost:8000/api/v1/fe';
  // } else if (hostname.startsWith('in')) {
  //   // return 'https://bl-india.com/api/v1/fe';
  //   return 'http://in.localhost:8000/api/v1/fe';
  // }
  return 'https://www.bl-india.com/api/v1/fe'; // Default to local
  // return 'http://localhost:8000/api/v1/fe';
};

const getLocale = () => {
  return localStorage.getItem('selectedLanguage') || 'en'; // Default to 'en' if locale is not set
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
  const token = localStorage.getItem('token');
  
  config.headers['Accept-Language'] = locale;
  config.headers['current-locale'] = locale;
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
