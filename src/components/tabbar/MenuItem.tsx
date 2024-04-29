import { Button } from '@mui/material';
export const MenuItem = (props: { name: string }) => {
  return (
      <Button variant='outlined' color="secondary">{props.name}</Button>
  );
};
