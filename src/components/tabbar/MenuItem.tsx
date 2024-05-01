import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
export const MenuItem = (props: { name: string; link: string }) => {
  return (
    <Link to={props.link.toLowerCase()}>
      <Button variant="outlined" color="secondary">
        {props.name}
      </Button>
    </Link>
  );
};
