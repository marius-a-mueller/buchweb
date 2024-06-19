import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './features/auth';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import https from 'https';

https.globalAgent.options.rejectUnauthorized = false;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
