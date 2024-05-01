import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: grey[50],
    },
    secondary: {
      main: red[600],
    },
  },
});
