// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { logger } from '@/util';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { getTypes } from './api/getTypes';

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
        logger.info('Fetched types: ', tempTypes);
        setTypes(tempTypes);
      } catch (err) {
        console.error('Error fetching book details:', err);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line no-void
    void fetchBook();
  }, []);

  const countType = (typ: string) => {
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
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 3,
            alignItems: 'center',
            justifyContent: 'space-between',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '&:hover': {
              boxShadow: 10,
            },
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
            height={375}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'top', horizontal: 'middle' },
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export { PieChartForm };
