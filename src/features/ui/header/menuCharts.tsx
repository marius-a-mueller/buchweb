import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
// eslint-disable-next-line @typescript-eslint/naming-convention
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
// eslint-disable-next-line @typescript-eslint/naming-convention
import * as React from 'react';
import { Link } from 'react-router-dom';

interface MenuChartsProps {
  label: string;
  icon?: React.ReactNode;
}

const MenuCharts = ({ label, icon }: MenuChartsProps) => (
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

export { MenuCharts };
