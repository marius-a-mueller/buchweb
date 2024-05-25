import axios from 'axios';
import cert from '@/assets/certificate.crt?raw';
import { Agent } from 'node:https';

const httpsAgent = new Agent({
  requestCert: true,
  rejectUnauthorized: false,
  ca: cert,
});

const AxiosInstance = axios.create({
  baseURL: 'https://localhost:3000',
  httpsAgent,
  timeout: 1000,
});

export { AxiosInstance };
