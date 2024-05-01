import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export const MenuItem = (props: { name: string; link: string; icon?: ReactNode }) => {
  return (
    <Link to={props.link.toLowerCase()}>
      <Button variant="outlined" color="secondary" startIcon={props.icon}>
        {props.name}
      </Button>
    </Link>
  );
};
