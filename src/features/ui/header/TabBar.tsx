import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import React from 'react';
import { ColorModeContext } from '@/App';
import { MenuItem } from './MenuItem';
import { MenuDropdown } from './MenuDropdown';
import HKALogo from '@/assets/HKALogo.png';
import { LoginModal } from '@/features/auth';

export const TabBar = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Link to="/">
              <img
                src={HKALogo}
                alt="HKA Logo"
                style={{ width: '200px', marginRight: '20px' }}
              />
            </Link>
            <MenuItem name="Suche" link="search" icon={<SearchIcon />} />
            <MenuItem name="Neues Buch" link="new" icon={<AutoStoriesIcon />} />
            <MenuDropdown />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LoginModal />
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
