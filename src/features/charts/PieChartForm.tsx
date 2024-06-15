import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { getTypes } from './api/getTypes';
import { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const PieChartForm = () => {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const tempTypes = await getTypes();
        console.log('Fetched types: ', tempTypes);
        setTypes(tempTypes);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  const countType = function (typ: string) {
    let count = 0;
    types.forEach((typen) => {
      if (typen === typ) {
        count++;
      }
    });
    return count;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box width="500px" p={3}>
        <Paper
          variant="outlined"
          sx={{
            padding: 2,
            marginBottom: 2,
            borderColor: 'grey.400',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            PieChart for Books
          </Typography>
          <PieChart
            loading={loading}
            series={[
              {
                data: [
                  { id: 0, value: countType('KINDLE'), label: 'Kindle' },
                  {
                    id: 1,
                    value: countType('DRUCKAUSGABE'),
                    label: 'Druckausgabe',
                  },
                ],
              },
            ]}
            width={isDesktop ? 400 : 300}
            height={200}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export { PieChartForm };
