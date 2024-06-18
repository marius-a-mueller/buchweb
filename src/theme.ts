import { createTheme, Theme } from '@mui/material/styles';
import { grey, red, green } from '@mui/material/colors';

export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: grey[500],
      },
      secondary: {
        main: red[600],
      },
    },
    components: {
      MuiTableHead: {
        styleOverrides: {
          root: {
            ...(mode === 'light'
              ? {
                  backgroundColor: grey[200],
                }
              : {
                  backgroundColor: grey[800],
                }),
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: red[600],
            '&.Mui-checked': {
              color: green[500],
            },
            '&.Mui-checked + .MuiSwitch-track': {
              backgroundColor: green[500],
            },
          },
          track: {
            backgroundColor: red[600],
          },
        },
      },
    },
  });
};