import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';

type MenuDropDownProps = {
  label: string;
};

const MenuDropdown = ({
  label
}: MenuDropDownProps) => {
  return (
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
              to="/barchart"
              onClick={popupState.close}
              data-cy="Säulendiagramm"
            >
              Säulendiagramm
            </MenuItem>
            <MenuItem
              component={Link}
              to="/piechart"
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
};

export { MenuDropdown };
