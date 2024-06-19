import axios from 'axios';
import https from 'https';

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export { AxiosInstance };
