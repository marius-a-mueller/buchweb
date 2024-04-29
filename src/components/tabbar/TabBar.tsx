import { AppBar, Container, Toolbar } from '@mui/material';
import { MenuItem } from './MenuItem';
import BookIcon from '@mui/icons-material/Book';

export const TabBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookIcon fontSize="large" color='secondary' />
          <MenuItem name="Suche" />
          <MenuItem name="Neues Buch" />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
