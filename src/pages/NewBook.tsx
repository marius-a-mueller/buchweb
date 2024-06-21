import { NewBookForm } from '@/features/add/NewBookForm';
import { Typography } from '@mui/material';

const NewBook = () => {
  <Typography
    variant="h6"
    component="h2"
    sx={{
      mb: 2,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: '15px',
    }}
  >
    Neues Buch hinzufügen
  </Typography>;
  return <NewBookForm />;
};

export { NewBook };
