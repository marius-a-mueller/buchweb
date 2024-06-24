import axios from 'axios';

const AxiosInstance = axios.create({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export { AxiosInstance };
