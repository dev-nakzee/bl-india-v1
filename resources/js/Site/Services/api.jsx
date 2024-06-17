import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://global.localhost:8000/api/v1/fe',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
