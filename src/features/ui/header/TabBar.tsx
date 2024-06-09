import React from 'react';
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
import { ColorModeContext } from '@/App';
import { MenuItem as TabBarMenuItem } from './MenuItem';
import { MenuDropdown } from './MenuDropdown';
import HKALogo from '@/assets/HKALogo.png';
import { LoginModal } from '@/features/auth';
import './TabBar.css'; // Importiere die CSS-Datei

const TabBar = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className="boxMain">
            <Link to="/">
              <img
                src={HKALogo}
                alt="HKA Logo"
                className="logo"
              />
            </Link>
            <Box className="desktopOnly">
              <TabBarMenuItem
                name="Suche"
                link="search"
                icon={<SearchIcon />}
              />
              <TabBarMenuItem
                name="Neues Buch"
                link="new"
                icon={<AutoStoriesIcon />}
              />
              <MenuDropdown label='Diagramme' />
            </Box>
          </Box>
          <Box className="boxSecondary">
            <LoginModal />
            <IconButton
              className="iconButton"
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

export { TabBar };
