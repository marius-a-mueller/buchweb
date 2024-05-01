import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

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
            <MenuItem onClick={popupState.close}>Säulendiagramm</MenuItem>
            <MenuItem onClick={popupState.close}>Balkendiagramm</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
