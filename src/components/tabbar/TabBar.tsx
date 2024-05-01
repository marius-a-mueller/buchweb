import { AppBar, Container, Toolbar, Box } from '@mui/material';
import { MenuItem } from './MenuItem';
import MenuDropdown from './MenuDropdown';
import HKALogo from './HKALogo.png';
import Login from './Login';

export const TabBar = () => {
  return (
    <AppBar position="static" color="default">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={HKALogo} alt="HKA Logo" style={{ width: '200px', marginRight: '20px' }} />
          <MenuItem name="Suche" />
          <MenuItem name="Neues Buch" />
          <MenuDropdown />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Login />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
};