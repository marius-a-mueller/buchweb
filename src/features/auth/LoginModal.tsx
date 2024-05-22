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
import { useAuth } from './hooks/useAuth';

export function LoginModal() {
  const { login, logout, isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = () => {
    setOpen(true);
    setUsername('');
    setPassword('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    console.info(`Login mit ${username} und ${password}`);
    const loginSucceeded = await login({ username, password });
    if (loginSucceeded) {
      setOpen(false);
    } else {
      console.error('Login fehlgeschlagen');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<unknown>, callback: () => void) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  return (
    <div>
      {isLoggedIn() ? (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CloseIcon />}
          onClick={logout}
        >
          Logout
        </Button>
      ) : (
        <Button
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
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={handleClose}
          >
            Abbrechen
          </Button>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<LoginIcon />}
            onClick={handleLogin}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
