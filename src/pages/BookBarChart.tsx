import { BarChartForm } from '@/features/charts';
import { Box } from '@mui/material';

const BookBarChart = () => (
  <Box
    component="form"
    sx={{
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '& .MuiTextField-root': { m: 1, width: '100%' },
      width: '90%',
    }}
    noValidate
    autoComplete="off"
  >
    <BarChartForm />
  </Box>
);

export { BookBarChart };
