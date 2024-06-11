import React, {useState} from 'react';
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
  Menu,
  MenuItem,
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
import MenuIcon from '@mui/icons-material/Menu';
import './TabBar.css'; 


const TabBar = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClick= (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


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
            <IconButton
              className="menuButton"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button component={Link} to="search" onClick={handleDrawerToggle}>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary="Suche" />
          </ListItem>
          <ListItem button component={Link} to="new" onClick={handleDrawerToggle}>
            <ListItemIcon><AutoStoriesIcon /></ListItemIcon>
            <ListItemText primary="Neues Buch" />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <MenuDropdown label='Diagramme' />
          </ListItem>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/barchart" onClick={handleClose}>
              Säulendiagramm
            </MenuItem>
            <MenuItem component={Link} to="/piechart" onClick={handleClose}>
              Kuchendiagramm
            </MenuItem>
          </Menu>
        </List>
      </Drawer>
    </AppBar>
  );
};

export { TabBar };
