import { ColorModeContext } from '@/app';
// eslint-disable-next-line @typescript-eslint/naming-convention
import HKALogo from '@/assets/hkaLogo.png';
import { LoginModal, useAuth } from '@/features/auth';
import {
  AutoStories,
  Brightness4,
  Brightness7,
  Equalizer,
  Menu,
  Search,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
// eslint-disable-next-line @typescript-eslint/naming-convention
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuCharts } from './menuCharts';
import { MenuDropdown } from './menuDropdown';
import { MenuItem as TabBarMenuItem } from './menuItem';

const TabBar = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { isLoggedIn } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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
            <Link to="/buchweb/">
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
              <TabBarMenuItem name="Suche" link="search" icon={<Search />} />
              {isLoggedIn() ? (
                <TabBarMenuItem
                  name="Neues Buch"
                  data-cy="neuesBuch"
                  link="new"
                  icon={<AutoStories />}
                />
              ) : undefined}

              <MenuDropdown label="Diagramme" />
            </Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isDesktop ? <LoginModal /> : undefined}
            <IconButton
              style={{
                marginLeft: '1rem',
              }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
              data-cy="toggle-dark-mode"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
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
              <Menu />
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
              <Search />
            </ListItemIcon>
            <ListItemText primary="Suche" data-cy="SucheSide" />
          </ListItem>
          {isLoggedIn() ? (
            <ListItem
              button
              component={Link}
              to="new"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <AutoStories />
              </ListItemIcon>
              <ListItemText primary="Neues Buch" data-cy="NeuesBuchSide" />
            </ListItem>
          ) : undefined}
          <MenuCharts label="Diagramme" icon={<Equalizer />} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <LoginModal />
          </Box>
        </List>
      </Drawer>
    </AppBar>
  );
};

export { TabBar };
