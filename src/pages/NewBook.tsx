import { NewBookForm } from '@/features/add/NewBookForm';
import { Box, Typography } from '@mui/material';

const NewBook = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
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
      </Typography>
      <NewBookForm />
    </Box>
  );
};

export { NewBook };
