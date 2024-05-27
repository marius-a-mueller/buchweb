import { BarChartForm } from '@/features/charts';
import Box from '@mui/material/Box';


const BookBarChart = () => {

  return (
<>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          width: '60%',
        }}
        noValidate
        autoComplete="off"
      >
        <BarChartForm/>
      </Box>
    </>  );
};

export { BookBarChart };

