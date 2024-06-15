import React, { useState } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
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
import { LoginModal, useAuth } from '@/features/auth';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuCharts } from './MenuCharts';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const TabBar = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { isLoggedIn } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            className="boxMain"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Link to="/">
              <img
                src={HKALogo}
                alt="HKA Logo"
                style={
                  isDesktop
                    ? {
                        width: '200px',
                        marginRight: '20px',
                      }
                    : {
                        width: '130px',
                        marginRight: 0,
                      }
                }
                data-cy="logo"
              />
            </Link>
            <Box
              sx={
                isDesktop
                  ? {}
                  : {
                      display: 'none',
                    }
              }
            >
              <TabBarMenuItem
                name="Suche"
                link="search"
                icon={<SearchIcon />}
              />
              {isLoggedIn() ? (
                <TabBarMenuItem
                  name="Neues Buch"
                  data-cy="neuesBuch"
                  link="new"
                  icon={<AutoStoriesIcon />}
                />
              ) : null}

              <MenuDropdown label="Diagramme" />
            </Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LoginModal />
            <IconButton
              style={{
                marginLeft: '1rem',
              }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
              data-cy="toggle-dark-mode"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <IconButton
              className="menuButton"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              data-cy="menuButton"
              style={
                isDesktop
                  ? {
                      display: 'none',
                    }
                  : {
                      display: 'block',
                    }
              }
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem
            button
            component={Link}
            to="search"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Suche" data-cy="SucheSide" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="new"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Neues Buch" data-cy="NeuesBuchSide" />
          </ListItem>
          <MenuCharts label="Diagramme" icon={<EqualizerIcon />} />
        </List>
      </Drawer>
    </AppBar>
  );
};

export { TabBar };
