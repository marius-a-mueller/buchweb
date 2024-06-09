import { PieChartForm } from '@/features/charts';
import Box from '@mui/material/Box';

const BookPieChart = () => {

  return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          width: '90%',
        }}
        noValidate
        autoComplete="off"
      >
        <PieChartForm/>
      </Box>
      );
};

export { BookPieChart };

