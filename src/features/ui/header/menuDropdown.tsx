import { Button, Menu, MenuItem } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/naming-convention
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
// eslint-disable-next-line @typescript-eslint/naming-convention
import * as React from 'react';
import { Link } from 'react-router-dom';

interface MenuDropDownProps {
  label: string;
}

const MenuDropdown = ({ label }: MenuDropDownProps) => (
  <PopupState variant="popover" popupId="demo-popup-menu">
    {(popupState) => (
      <React.Fragment>
        <Button
          variant="outlined"
          color="secondary"
          {...bindTrigger(popupState)}
          sx={{ margin: '5px' }}
          data-cy={label}
        >
          {label}
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem
            component={Link}
            to="barchart"
            onClick={popupState.close}
            data-cy="Säulendiagramm"
          >
            Säulendiagramm
          </MenuItem>
          <MenuItem
            component={Link}
            to="piechart"
            onClick={popupState.close}
            data-cy="Piechart"
          >
            Kuchendiagramm
          </MenuItem>
        </Menu>
      </React.Fragment>
    )}
  </PopupState>
);

export { MenuDropdown };
