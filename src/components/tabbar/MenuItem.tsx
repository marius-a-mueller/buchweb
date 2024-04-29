import { Button } from '@mui/material';

export const MenuItem = (props: { name: string }) => {
  return <Button color="secondary">{props.name}</Button>;
};
