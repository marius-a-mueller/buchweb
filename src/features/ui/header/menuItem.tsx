import { Button } from '@mui/material';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

const MenuItem = (props: { name: string; link: string; icon?: ReactNode }) => (
  <Link to={props.link.toLowerCase()}>
    <Button
      variant="outlined"
      color="secondary"
      startIcon={props.icon}
      sx={{ margin: '5px' }}
      data-cy={props.name}
    >
      {props.name}
    </Button>
  </Link>
);

export { MenuItem };
