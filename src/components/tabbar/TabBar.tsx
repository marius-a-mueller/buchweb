import { AppBar, Container, Toolbar } from '@mui/material';
import { MenuItem } from './MenuItem';
import BookIcon from '@mui/icons-material/Book';
import MenuDropdown from './MenuDropdown';

// Importiere dein Bild
import HKALogo from './HKALogo.png';

export const TabBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookIcon fontSize="large" color='secondary' />
          <MenuItem name="Suche" />
          <MenuItem name="Neues Buch" />
          <MenuDropdown />
          <img src={HKALogo} alt="Beschreibung des Bildes" style={{ width: '215px', marginLeft: '650px' }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
