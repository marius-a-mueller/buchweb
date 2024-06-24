/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
import { green, grey, red } from '@mui/material/colors';
import { createTheme, type Theme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark'): Theme =>
    createTheme({
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
