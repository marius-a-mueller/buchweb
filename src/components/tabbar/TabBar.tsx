import { AppBar, Container, Toolbar, Box } from '@mui/material';
import { MenuItem } from './MenuItem';
import MenuDropdown from './MenuDropdown';
import HKALogo from '../../assets/HKALogo.png';
import Login from './Login';
import { Link } from 'react-router-dom';

export const TabBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link to="/">
              <img
                src={HKALogo}
                alt="HKA Logo"
                style={{ width: '200px', marginRight: '20px' }}
              />
            </Link>
            <MenuItem name="Suche" link="search" />
            <MenuItem name="Neues Buch" link="new" />
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
