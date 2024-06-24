/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */

import { Close, Login } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useTheme,
} from '@mui/material';
import { useState, type KeyboardEvent } from 'react';
import { useAuth } from './hooks/useAuth';

const LoginModal = () => {
  const theme = useTheme();
  const { login, logout, isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setShowError('');
    setUsername('');
    setPassword('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    console.info(`Login mit ${username}`);
    try {
      const loginSucceeded = await login({ username, password });
      if (loginSucceeded) {
        setOpen(false);
        setShowError('');
      } else {
        setShowError('Login fehlgeschlagen!');
      }
    } catch {
      setShowError('Keine Verbindung zum Server!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<unknown>, callback: () => void) => {
    if (e.key === 'Enter') {
      // eslint-disable-next-line n/callback-return
      callback();
    }
  };

  return (
    <>
      {isLoggedIn() ? (
        <Button
          data-cy="logout-button"
          variant="outlined"
          color="secondary"
          startIcon={<Close />}
          onClick={logout}
          disableFocusRipple
        >
          Logout
        </Button>
      ) : (
        <Button
          data-cy="login-button"
          variant="outlined"
          color="secondary"
          startIcon={<Login />}
          onClick={handleOpen}
        >
          Login
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bitte geben Sie Ihre Login-Daten ein, um fortzufahren.
          </DialogContentText>
          <Box component="form">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nutzername"
              type="nutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleLogin)}
              fullWidth
              variant="standard"
              data-cy="login-username"
              autoComplete="on"
            />
            <TextField
              margin="dense"
              id="password"
              label="Passwort"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleLogin)}
              fullWidth
              variant="standard"
              data-cy="login-password"
              autoComplete="on"
            />
            {showError === '' ? undefined : (
              <Alert severity="error">{showError}</Alert>
            )}
            {loading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'rgba(0, 0, 0, 0.8)',
                  zIndex: 1,
                }}
              >
                <CircularProgress
                  size={60}
                  thickness={5}
                  sx={{
                    color: 'secondary.main',
                    animationDuration: '550ms',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Close />}
            onClick={handleClose}
            disabled={loading}
          >
            Abbrechen
          </Button>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Login />}
            onClick={handleLogin}
            data-cy="login-button-second"
            disabled={loading}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { LoginModal };
