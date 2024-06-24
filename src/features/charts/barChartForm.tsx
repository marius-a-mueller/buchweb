// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { logger } from '@/util';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { getStats } from './api/getStats';

const BarChartForm = () => {
  const [ratings, setRatings] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const tempRatings = await getStats();
        logger.info('Fetched ratings: ', tempRatings);
        setRatings(tempRatings);
      } catch (err) {
        console.error('Error fetching book details:', err);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line no-void
    void fetchBook();
  }, []);

  const countRating = (i: number) => {
    let count = 0;
    for (const rating of ratings) {
      if (rating === i) {
        count++;
      }
    }
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
            BarChart for Books
          </Typography>
          <BarChart
            xAxis={[
              {
                label: 'Bewertungen',
                scaleType: 'band',
                data: ['1', '2', '3', '4', '5'],
              },
            ]}
            yAxis={[
              {
                label: 'Anzahl Bewertungen',
                scaleType: 'linear',
                tickMinStep: 1,
              },
            ]}
            loading={loading}
            series={[
              {
                data: Array.from({ length: 5 }, (_, i) => countRating(i + 1)),
              },
            ]}
            width={isDesktop ? 400 : 300}
            height={300}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export { BarChartForm };
