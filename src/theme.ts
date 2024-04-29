import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: red[400],
    },
    secondary: {
      main: grey[900],
    },
  },
});
