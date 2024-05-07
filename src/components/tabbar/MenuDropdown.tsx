import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';

export default function MenuDropdown() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="outlined"
            color="secondary"
            {...bindTrigger(popupState)}
            sx={{ margin: '5px' }}
          >
            Diagramme
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem component={Link} to="/barchart" onClick={popupState.close}>Säulendiagramm</MenuItem>
            <MenuItem component={Link} to="/columnchart" onClick={popupState.close}>Balkendiagramm</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
