
import axios from 'axios';
import config from '../config';

const apiKey = config.API_KEY;

const api = axios.create({
    baseURL: config.API_URL,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
    }
});

export default api;
