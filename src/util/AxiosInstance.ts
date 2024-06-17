import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://localhost:3000',
  timeout: 5000,
});

export { AxiosInstance };
