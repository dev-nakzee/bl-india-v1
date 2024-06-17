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

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default apiClient;
