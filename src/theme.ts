import { createTheme, Theme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: grey[50],
      },
      secondary: {
        main: red[600],
      },
    },
  });
};
