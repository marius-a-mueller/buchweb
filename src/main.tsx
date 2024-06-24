import { App } from '@/App.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line @typescript-eslint/naming-convention
import React from 'react';
// eslint-disable-next-line @typescript-eslint/naming-convention
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './features/auth';

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);
