import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';

export default function Login() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" startIcon={<LoginIcon />} onClick={handleClickOpen}>
        Login
      </Button>
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
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="password"
            label="Passwort"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color='secondary' startIcon={<CloseIcon />} onClick={handleClose}>Abbrechen</Button>
          <Button variant="contained" color='secondary' endIcon={<LoginIcon />}onClick={handleClose}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
