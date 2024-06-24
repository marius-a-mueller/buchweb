import { NewBookForm } from '@/features/add/newBookForm';
import { Box, Typography } from '@mui/material';

const NewBook = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

export { NewBook };
