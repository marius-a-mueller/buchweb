import { AppBar, Container, Toolbar } from '@mui/material';
import { MenuItem } from './MenuItem';

export const TabBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuItem name="Suche" />
          <MenuItem name="Neues Buch" />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
