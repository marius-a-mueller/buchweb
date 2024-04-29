import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: red[500],
    },
    secondary: {
      main: grey[900],
    },
  },
});
