import { useState } from 'react';
import { KeyboardEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from './hooks/useAuth';
import { Alert, Box } from '@mui/material';

export function LoginModal() {
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
    } catch (error) {
      setShowError('Keine Verbindung zum Server!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<unknown>, callback: () => void) => {
    if (e.key === 'Enter') {
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
          startIcon={<CloseIcon />}
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
          startIcon={<LoginIcon />}
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
            {showError !== '' ? (
              <Alert severity="error">{showError}</Alert>
            ) : null}
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
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
            startIcon={<CloseIcon />}
            onClick={handleClose}
            disabled={loading}
          >
            Abbrechen
          </Button>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<LoginIcon />}
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
}
