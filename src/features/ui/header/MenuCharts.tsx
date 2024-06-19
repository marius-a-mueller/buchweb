import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

type MenuChartsProps = {
  label: string;
  icon?: React.ReactNode;
};

const MenuCharts = ({ label, icon }: MenuChartsProps) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <ListItem button {...bindTrigger(popupState)}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={label} data-cy="DiagrammeS" />
          </ListItem>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              component={Link}
              to="barchart"
              onClick={popupState.close}
              data-cy="SäulendiagrammS"
            >
              Säulendiagramm
            </MenuItem>
            <MenuItem
              component={Link}
              to="piechart"
              onClick={popupState.close}
              data-cy="KuchendiagrammS"
            >
              Kuchendiagramm
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export { MenuCharts };
